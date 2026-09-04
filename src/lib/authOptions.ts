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
          if (process.env.NODE_ENV!=="production") console.error("Authorize error:", err);
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
          shouldHydrate: false,
        };
      }

      if (trigger === "update") {
        if (session?.user) {
          token.user = { ...(token.user as object), ...session.user };
        } else if (token.accessToken) {
          try {
            token.user = await getCurrentUser(token.accessToken as string);
          } catch (err) {
            if (process.env.NODE_ENV !== "production") {
              console.error("[jwt] update() getCurrentUser failed:", err);
            }
          }
        }
        token.shouldHydrate = false;
        token.error = undefined;
        
        return token;
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
        const res = await fetch(`${apiBase}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });

        if (!res.ok) throw new Error(`Refresh failed (${res.status})`);

        const data = await res.json();

        return {
          ...token,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken ?? token.refreshToken,
          accessTokenExpires: getTokenExpiry(data.data.accessToken),
          error: undefined,
        };
      } catch (err) {
        if (process.env.NODE_ENV !== "production") console.error("Token refresh error:", err);
        
        return {
          ...token,
          accessTokenExpires: 0,
          accessToken: undefined,
          refreshToken: undefined,
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
        } catch {
          // keep token.user – never set error here
        }
      }

      return session;
    },
  },
};

export default authOptions;
