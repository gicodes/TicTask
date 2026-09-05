export type BillingOverview = {
  subscription: {
    plan: string;
    billingCycle?: string | null;
    active: boolean;
    expiresAt: string;
    amount?: number | null;
    daysRemaining?: number;
    subscribed?: boolean;
  } | null;
  customerCode: string | null;
  canUpdatePaymentMethod: boolean;
  recentHistory: Array<{
    id: string;
    type: string;
    plan?: string;
    amount?: number;
    currency?: string;
    status?: string;
    description: string;
    reference?: string;
    createdAt: string;
  }>;
};