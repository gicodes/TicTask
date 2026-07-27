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

  billingCycle?: string;

  paystackSubscriptionCode: string;
  paystackCustomerCode: string;
  paystackReference: string; 

  stripeSubscriptionId: string;
  stripeCustomerId: string;
  
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

export type Interval = "monthly" | "yearly";
export type PaymentProvider = "paystack" | "flutterwave" | "stripe";

export interface GetSubAPIResponse {
  ok: boolean,
  subscribed: true,
  data: {
    subscription: Subscription;
    daysRemaining: number;
    expired: string;
  }
}

export interface CheckoutResData {
  authorization_url: string;
  reference: string;
  access_code: string;
}

export interface SubscriptionContextProps {
  subscription: Subscription | null;
  loading: boolean;

  isActive: boolean;
  isPro: boolean;
  isEnterprise: boolean;
  isFreeTrial: boolean;
  interval?: Interval;

  refresh(): Promise<void>;
  cancel(): Promise<void>;
  upgradeToCheckout(plan: Plan, billingCycle?: Interval): Promise<string | undefined>;

  startFreeTrial(days?: number): Promise<Subscription | null>;
  getPro(): Promise<{ redirect?: string; message?: string }>;
}
