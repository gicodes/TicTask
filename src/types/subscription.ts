import { User } from "./users";

export enum Plan {
  FREE = "FREE",
  STANDARD = "STANDARD",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export type Interval = "monthly" | "yearly";
export type PaymentProvider = "paystack" | "flutterwave" | "stripe";

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
  
  startedAt: string;
  expiresAt: string;
  createdAt: string;

  teamId: number;
  userId: number;

  daysRemaining?: number;
  expired?: string | Date;
};

export interface GetSubAPIResponse {
  ok: boolean,
  subscribed: true,
  data: Subscription,
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
  billingCycle?: Interval;

  refresh(): Promise<void>;
  cancel(): Promise<void>;
  upgradeToCheckout(plan: Plan, billingCycle?: Interval): Promise<string | undefined>;

  startFreeTrial(days?: number): Promise<Subscription | null>;
  getPro(): Promise<{ redirect?: string; message?: string }>;
}

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

export interface TeamSubscriptionProviderProps {
  teamId: number;
  children: React.ReactNode;
}