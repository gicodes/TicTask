import { DefaultSession, DefaultUser } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { PushSubscriptions } from "./subscription";
import { TeamMember } from "./team";
import { UserPreferences } from "./users";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string | number;
    role: Role;
    name: string;
    email: string;
    userType?: UserType;
    photo?: string;
    collab?: boolean;
    partner?: boolean;
    position?: string;
    organization?: string;
    subscription?: Subscription;
    data?: UserPreferences
    accessToken: string;
    refreshToken: string;
    credits: number;
    error?: "RefreshAccessTokenError";

    pushSubscriptions?: PushSubscriptions[];
    teamMemberships?: TeamMember[];
    status?: UserStatus;
    statusUntil?: string | null;
    lastLoginAt?: string | Date;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string | undefined | null;
    refreshToken: string;
    error: unknown;
  }

  interface JWTCallbackParams {
    token: import("next-auth/jwt").JWT;
    user?: User | null;
    account?: import("next-auth").Account | null;
    profile?: unknown;
    trigger?: "signIn" | "signUp" | "update";
    isNewUser?: boolean;
    session?: unknown;
    req: NextApiRequest;
    res: NextApiResponse;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: import("next-auth").User | null;
    accessToken: string | undefined | null;
    refreshToken: string | null | undefined;
    accessTokenExpires?: number;
    error?: "RefreshAccessTokenError"
    expires?: number | null;
    status?: UserStatus;
    statusUntil?: string | null;
  }
}