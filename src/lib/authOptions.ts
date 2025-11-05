import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginRequest, LoginResponse, RefreshToken } from '@/types/axios';
import GoogleProvider from 'next-auth/providers/google';
import SlackProvider from 'next-auth/providers/slack';
import XProvider from 'next-auth/providers/twitter';
import type { NextAuthOptions } from 'next-auth';
import { nextAuthApiPost } from './api';
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
          const res = await nextAuthApiPost<LoginResponse, LoginRequest>(
            "/auth/login", credentials!
          );
          user = res.user;
          user.accessToken = res.accessToken;

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
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // refresh every 24h
  },
  callbacks: {
    async jwt({ token, user }) {
  if (user) {
      token.user = user;
      token.expires = Math.floor(Date.now() / 1000) + 15 * 60;
    }
      const now = Date.now() / 1000;

      if (token.accessToken && token.expires && +token.expires - now < 60) {
        try {
          const res: RefreshToken = await nextAuthApiPost("/auth/refresh");
          token.accessToken = res.accessToken;
          token.expires = now + 15 * 60;
        } catch (err) {
          console.error("Failed to refresh token:", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user as User;
      return session;
    },
  },
};

export default authOptions;

export const authErrorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password.",
  OAuthSignin: "Error connecting to the provider.",
  OAuthCallback: "Error handling the callback from the provider.",
  OAuthCreateAccount: "Could not create your account via provider.",
  EmailCreateAccount: "Could not create your account with email.",
  Callback: "An unexpected error occurred. Please try again.",
  OAuthAccountNotLinked: "Please sign in with the same method you used to create your account.",
  EmailSignin: "Error sending sign-in email.",
  SessionRequired: "Please sign in to access this page.",
  Default: "Something went wrong. Please try again later.",
};