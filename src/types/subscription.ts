import { User } from "./users";

export enum Plan {
  FREE = "FREE",
  STANDARD = "STANDARD",
  PRO_MONTH = "PRO_MONTH",
  PRO_ANNUAL = "PRO_ANNUAL",
  ENTERPRISE_MONTH = "ENTERPRISE_MONTH",
  ENTERPRISE_ANNUAL = "ENTERPRISE_ANNUAL",
}

export type Subscription = {
  id: number;
  plan: Plan;
  active: boolean;
  duration: number;
  trial: boolean;
  
  interval: "monthly" | 'yearly';
  startedAt: string;
  expiresAt: string;
  createdAt: string;

  teamId: number;
  userId: number;
};

export interface PushSubscriptions {
  id: number;
  enabled: boolean;
  user: User;
  userId: number;
  p256dh: string;
  auth: string;
  createdAt: string;
  updatedAt: string;
}