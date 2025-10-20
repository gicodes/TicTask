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