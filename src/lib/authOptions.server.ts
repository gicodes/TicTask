import { LoginRequest, LoginResponse, RefreshToken } from '@/types/axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import SlackProvider from 'next-auth/providers/slack';
import XProvider from 'next-auth/providers/twitter';
import type { NextAuthOptions } from 'next-auth';
import { nextAuthApiPost } from './api';
import { cookies } from "next/headers";
import { User } from '@/types/users';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        let user = null;

        try {
          const res = await nextAuthApiPost<LoginResponse, LoginRequest>("/auth/login", credentials!);
          user = res.user;
          if (res.ok && user) return user;
        } catch (error) {
          console.log("Login error at nextAuth Options:", error);
          return null;
        }        
        return user;
      }
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
      version: '2.0',
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/signup',
    error: '/login?error=true',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60, 
  },
  callbacks: {
    async jwt(params) {
      const { token, user } = params;

      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
        token.expires = Math.floor(Date.now() / 1000) + 15 * 60;
      }

      const now = Date.now() / 1000;
      if (token.expires && now > Number(token.expires) - 5 * 60) {
        try {
          const cookieStore = cookies();
          const refresh = (await cookieStore).get("refresh_token")?.value;
          if (!refresh) console.error("Missing refresh cookie.. Throwing error in 0.01ms");

          const resData = await nextAuthApiPost<RefreshToken>(
            "/auth/refresh",
            undefined,
            { withCredentials: true }
          );

          token.accessToken = resData.accessToken;
          token.expires = now + 15 * 60;
        } catch (err) {
          console.error("Failed to refresh token:", err);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  }
};

export default authOptions;