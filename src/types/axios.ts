import { BlogCardProps, ChangeLogProps, FAQProps } from "./resources";
import { Role } from "./users";

export interface VerifyEmailRequest {
  email: string;
  role: "ADMIN" | "USER";
  name?: string;
  password?: string;
}

export interface VerifyEmailResponse {
  message: string;
  redirect?: string;
  role?: "ADMIN" | "USER";
  email?: string;
}

export interface ConfirmVerificationRequest {
  token: string;
}

export interface ConfirmVerificationResponse {
  message: string;
  redirect?: string;
  role?: "ADMIN" | "USER";
  email?: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  ok: boolean;
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: Role;
  }
}

export interface ContactUs {
  message: string;
  email: string;
  name?: string;
}

export interface BlogRes {
  ok?: boolean;
  data: BlogCardProps[]
}

export interface ChangeLostRes {
  ok?: boolean
  update: ChangeLogProps[]
}

export interface FAQRes {
  ok?: boolean;
  faq: FAQProps[]
}