import { BlogCardProps, ChangeLogProps, FAQProps } from "./resources";
import { Subscription } from "./subscription";
import { Role, User } from "./users";
import { Ticket, TicketHistory, TicketNote } from "./ticket";

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
  user: {
    id: string;
    role: Role;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  }
  error?: string
}

export interface NextAuthLoginResponse {
  ok?: boolean;
  error?: string;
  status?: number;
  url: string;
}

export interface ContactUs {
  message: string;
  email: string;
  name?: string;
}

export interface AllBlogsRes {
  ok?: boolean;
  data: BlogCardProps[];
}

export interface BlogRes {
  ok?: boolean;
  data: BlogCardProps;
}

export interface ChangeLostRes {
  ok?: boolean
  update: ChangeLogProps[]
}

export interface FAQRes {
  ok?: boolean;
  faq: FAQProps[]
}

export interface TicketsRes {
  ok: boolean;
  message: string;
  ticket: Ticket;
  tickets: Ticket[];
}

export interface TicketRes {
  ok: boolean
  data?: unknown;
  note?: TicketNote;
  notes?: TicketNote[];
  history?: TicketHistory[];
}

export interface UserProfileRes {
  ok?: boolean;
  message?: string;
  data: User;
}

export interface RefreshToken {
  accessToken: string
}

export interface SubscriptionRes {
  ok: boolean;
  message?: string;      
  data: Subscription | null;
}

export interface GenericAPIReq {
  message?: string;
  data?: string;
}

export interface GenericAPIRes {
  ok?: boolean;
  message: string;
  data?: unknown;
  redirect?: string
  user?: {
    email: string;
  }
  error?: {
    message: string;
  }
  reply?: string
}

export interface StripeCheckOutSessionRequest {
  userId: number;
  plan: string
}

export interface StripeCheckOutSessionResponse {
  ok: boolean;
  message: string;
  error?: {
    message: string
  }
  data: StripeCheckOutSessionResponseData
} 

export interface StripeCheckOutSessionResponseData {
  url: string;
  sessionId: string;
}
