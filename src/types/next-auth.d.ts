import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string | number;
    email: string;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user?: import("next-auth").User;
    accessToken: string;
    expires?: number;
  }
}