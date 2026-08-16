import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";
import XProvider from "next-auth/providers/twitter";

import { getCurrentUser } from "./getCurrentUser";
import { getTokenExpiry } from "./jwtDecode";
import { nextAuthApiPost } from "./axios";

import type { LoginRequest, LoginResponse } from "@/types/axios";
import type { NextAuthOptions } from "next-auth";
import type { User } from "@/types/users";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await nextAuthApiPost<LoginResponse, LoginRequest>(
            "/auth/login",
            credentials!
          );

          if (res.ok && res.user) return res.user;

          return null;
        } catch (err) {
          // console.error("Authorize error:", err);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    SlackProvider({
      clientId: process.env.SLACK_CLIENT_ID!,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
    }),

    XProvider({
      clientId: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      if (user) {
        const authUser = user as User;
        return {
          ...token,
          user: authUser,
          accessToken: authUser.accessToken,
          refreshToken: authUser.refreshToken,
          accessTokenExpires: getTokenExpiry(authUser.accessToken),
          error: undefined,
        };
      }

      if (trigger === "update") {
        if (session?.user) {
          token.user = { ...token.user, ...session.user };
        } else if (token.accessToken) {
          try {
            const fresh = await getCurrentUser(token.accessToken as string);
            token.user = fresh;
          } catch {}
        }
        token.shouldHydrate = true;
      }

      if (
        token.accessToken &&
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number) - 60_000
      ) {
        return token;
      }

      if (!token.refreshToken) {
        return { 
          ...token, 
          accessToken: undefined,
          accessTokenExpires: 0,
          error: "RefreshAccessTokenError",
        };
      }

      try {
        const apiBase = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
        console.log("AuthOptions jwt callback token.refreshToken", token.refreshToken)
        const res = await fetch(`${apiBase}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });

        if (!res.ok) throw new Error(`Refresh failed (${res.status})`);

        const data = await res.json();

        return {
          ...token,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken ?? token.refreshToken,
          accessTokenExpires: getTokenExpiry(data.accessToken),
          error: undefined,
        };
      } catch (err) {
        // console.error("Token refresh error:", err);
        return {
          ...token,
          accessToken: undefined,
          refreshToken: undefined,
          accessTokenExpires: 0,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token }) {
      session.error = token.error as string | undefined;
      session.accessToken = token.accessToken as string | undefined;

      if (token.user) {
        session.user = token.user as User;
      }

      if (token.accessToken && !token.error && token.shouldHydrate) {
        try {
          session.user = await getCurrentUser(token.accessToken as string);
        } catch { // fall back to token.user
        }
      }

      return session;
    }
  },
};

export default authOptions;
