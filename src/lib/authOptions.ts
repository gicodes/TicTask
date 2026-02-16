import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import SlackProvider from "next-auth/providers/slack";
import XProvider from "next-auth/providers/twitter";

import { LoginRequest, LoginResponse } from "@/types/axios";
import type { NextAuthOptions } from "next-auth";
import { getTokenExpiry } from "./jwtDecode";
import { nextAuthApiPost } from "./axios";
import { User } from "@/types/users";

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
    async jwt({ token, user }) {
      if (user) {
        const accessTokenExpires = getTokenExpiry(user.accessToken);

        return {
          user: user as User,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires,
        };
      }

      if (!token.accessToken || !token.accessTokenExpires) {
        return token;
      }

      if (Date.now() < (token.accessTokenExpires as number) - 60_000) {
        return token;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Refresh request failed");
        }

        const data = await res.json();

        const accessTokenExpires = getTokenExpiry(data.accessToken);

        return {
          ...token,
          accessToken: data.accessToken,
          accessTokenExpires,
        };
      } catch (err) {
        console.error("Refresh failed:", err);

        return {
          accessToken: null,
          refreshToken: null,
          accessTokenExpires: null,
          user: null,
        };
      }
    },

    async session({ session, token }) {
      if (!token?.accessToken || !token?.user) {
        return null as any;
      }

      session.user = token.user as User;
      session.accessToken = token.accessToken;

      return session;
    },
  },
};

export default authOptions;
