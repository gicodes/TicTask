import { Dispatch, SetStateAction } from "react";
import { SignInResponse } from 'next-auth/react';
import { Role, UserType, UserPreferences } from '@/types/users';
import { Subscription, PushSubscriptions } from '@/types/subscription';
import { TeamMember } from "./team";

export interface LoginTemplateProps {
  email: string;
  password: string;
  error?: string;
  submitting?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  remember: boolean;
  setRemember: Dispatch<SetStateAction<boolean>>;
}

export interface RememberMeProps {
  remember: boolean;
  setRemember: (value: boolean) => void;
  email?: string;
  password?: string
}

export interface AuthUser {
  id: number;
  role: Role;
  name: string;
  email: string;
  userType?: UserType;
  photo?: string;
  collab?: boolean;
  partner?: boolean;
  position?: string;
  organization?: string;
  accessToken: string;
  subscription?: Subscription;
  data?: UserPreferences;
  credits: number;
  teamMemberships?: TeamMember;
  teamMembership?: boolean | null;
  pushSubscriptions?: PushSubscriptions[];
  lastLoginAt?: string | Date;
}

export interface LoginProps {
  email: string;
  password: string;
  provider?: string;
  ip?: string;
  device?: string;
  returnUrl?: string;
}

export interface AuthContextProps {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isBusiness: boolean;
  login: (props: LoginProps) => Promise<SignInResponse | void>;
  notifyNewDevice: (email: string, device: string, ip?: string) => Promise<void>;
  changeRole: (
    email: string,
    fromRole: string,
    toRole: string,
    changedBy?: string
  ) => Promise<void>;
  inviteUser: (email: string, invitedBy?: string) => Promise<void>;
  removeUser: (email: string, removedBy?: string) => Promise<void>;
  logout: () => Promise<void>;
}

export type SessionItem = {
  id: string;
  userId?: number;
  user?: AuthUser;
  email?: string;
  name?: string;
  role?: Role;
  device?: string;
  ip?: string;

  sessionId: string;
  isCurrent: boolean;
  accessToken?: string;

  createdAt: string | Date;
  updatedAt?: string | Date;
  expiresAt?: string | Date;
  [key: string]: unknown;
}