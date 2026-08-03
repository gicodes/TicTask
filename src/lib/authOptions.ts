import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";
import XProvider from "next-auth/providers/twitter";

import { LoginRequest, LoginResponse } from "@/types/axios";
import type { NextAuthOptions } from "next-auth";
import { getTokenExpiry } from "./jwtDecode";
import { nextAuthApiPost } from "./axios";
import { User } from "@/types/users";
import { getCurrentUser } from "./getCurrentUser";

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

          if (res.ok && res.user) {
            return res.user;
          }

          return null;
        } catch (err) {
          console.error("Authorize error:", err);
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const accessTokenExpires = getTokenExpiry(user.accessToken);
        return {
          user: user as User,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires,
        };
      }

      if (trigger === "update" && session) {
        return {
          ...token,
          accessToken: session.accessToken ?? token.accessToken,
          refreshToken: session.refreshToken ?? token.refreshToken,
          accessTokenExpires: session.accessTokenExpires
            ?? (session.accessToken ? getTokenExpiry(session.accessToken) : token.accessTokenExpires),
          error: undefined,
        };
      }

      if (
        token.accessToken &&
        token.accessTokenExpires &&
        Date.now() < (token.accessTokenExpires as number) - 60_000
      ) {
        return token;
      }

      if (!token.refreshToken) {
        return { ...token, error: "RefreshAccessTokenError" };
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Refresh failed (${res.status}): ${text}`);
        }

        const data = await res.json();
        const newAccessToken = data.accessToken ?? data.access_token;
        const newRefreshToken = data.refreshToken ?? data.refresh_token ?? token.refreshToken;

        if (!newAccessToken) throw new Error("No accessToken in refresh response");

        return {
          ...token,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accessTokenExpires: getTokenExpiry(newAccessToken),
          error: undefined,
        };
      } catch (err) {
        console.error("[JWT] Refresh failed:", err);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    async session({ session, token }) {
      session.error = token.error;
      session.accessToken = token.accessToken;

      if (token.user) {
        session.user = token.user as User;
      }

      if (token.accessToken && !token.error) {
        try {
          session.user = await getCurrentUser(
            token.accessToken
          );
        } catch (err) {
          console.error("Failed to hydrate session user:", err);

          if (token.user) {
            session.user = token.user as User;
          }
        }
      }

      return session;
    }
  },
};

export default authOptions;
