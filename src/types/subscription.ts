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
  
  interval: "monthly" | 'yearly';
  startedAt: string;
  expiresAt: string;
  createdAt: string;

  teamId: number;
  userId: number;
};
