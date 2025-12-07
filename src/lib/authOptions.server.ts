import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginRequest, LoginResponse } from '@/types/axios';
import GoogleProvider from 'next-auth/providers/google';
import SlackProvider from 'next-auth/providers/slack';
import XProvider from 'next-auth/providers/twitter';
import type { NextAuthOptions } from 'next-auth';
import { nextAuthApiPost } from './axios';
import { User } from '@/types/users';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await nextAuthApiPost<LoginResponse, LoginRequest>("/auth/login", credentials!);
          if (res.ok && res.user) {
            return res.user;
          }
        } catch (err) {
          console.error("authorize error", err);
        }
        return null;
      },
    }),
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    SlackProvider({ clientId: process.env.SLACK_CLIENT_ID!, clientSecret: process.env.SLACK_CLIENT_SECRET! }),
    XProvider({ clientId: process.env.X_CLIENT_ID!, clientSecret: process.env.X_CLIENT_SECRET!, version: "2.0" }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = (user as User).accessToken;
        token.expires = Math.floor(Date.now() / 1000) + 15 * 60;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user as User;
      session.accessToken = token.accessToken as string;

      return session;
    },
  },
};

export default authOptions;
