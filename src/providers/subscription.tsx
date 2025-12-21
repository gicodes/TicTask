'use client';

import { useAuth } from "@/providers/auth";
import { apiGet, apiPost } from "@/lib/axios";
import type { Subscription, Plan } from "@/types/subscription";
import React, { createContext, useContext, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  GenericAPIRes,
  StripeCheckOutSessionRequest,
  StripeCheckOutSessionResponse,
  StripeCheckOutSessionResponseData
} from "@/types/axios";
import { resolveIntervalFromPlan } from "@/lib/pricing";

type Interval = "monthly" | "yearly";

interface SubscriptionContextProps {
  subscription: Subscription | null;
  loading: boolean;

  isActive: boolean;
  isPro: boolean;
  isEnterprise: boolean;
  isFreeTrial: boolean;
  interval?: Interval;

  refresh(): Promise<void>;
  cancel(): Promise<void>;
  upgradeToCheckout(planId: string): Promise<string>;

  getPro(): Promise<{ redirect?: string; message?: string }>;
  startFreeTrial(days?: number): Promise<Subscription | null>;
}

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const qc = useQueryClient();

  const subQuery = useQuery<Subscription | null>({
  queryKey: ["subscription", user?.id],
  enabled: Boolean(user?.id),
  staleTime: 60_000,
  retry: false,
  queryFn: async () => {
    if (!user?.id) return null;

    try {
      const res = await apiGet<GenericAPIRes>(`/subscription/${user.id}`);

      if (res.status === 404) return null;

      if (!res.ok) {
        console.warn("Subscription fetch failed");
        return null;
      }

      return res.data as Subscription;
    } catch {
      // NEVER crash render tree
      return null;
    }
  },
});


  const subscription = subQuery.data ?? null;

  const startTrial = useMutation<Subscription | null, Error, number>({
    mutationFn: async (days = 14) => {
      if (!user?.id) throw new Error("Not authenticated");

      const res = await apiPost<GenericAPIRes>("/subscription", {
        id: user.id,
        plan: "FREE",
        duration: days,
      });

      if (!res.ok) throw new Error(res.error?.message);
      return res.data as Subscription;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription", user?.id] }),
  });

  const createCheckout = useMutation<
    StripeCheckOutSessionResponseData,
    Error,
    string
  >({
    mutationFn: async (planId) => {
      if (!user?.id) throw new Error("Not authenticated");

      const body: StripeCheckOutSessionRequest = {
        userId: user.id,
        plan: planId,
      };

      const res = await apiPost<
        StripeCheckOutSessionResponse,
        StripeCheckOutSessionRequest
      >("/subscription/stripe/checkout", body);

      if (!res.ok || !res.data) throw new Error(res.error?.message);
      return res.data;
    },
  });

  const cancel = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("Not authenticated");
      const res = await apiPost<GenericAPIRes>("/subscription/cancel", { id: user.id });
      if (!res.ok) throw new Error(res.error?.message);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription", user?.id] }),
  });

  const upgradeToCheckout = async (priceId: string) => {
    const data = await createCheckout.mutateAsync(priceId);
    return { url: data.url };
  };

  const plan = (subscription?.plan ?? "FREE") as Plan;
  const isActive = !!subscription?.active;
  const interval = isActive ? resolveIntervalFromPlan(plan) : undefined;

  const isPro = isActive && ["PRO_MONTH", "PRO_ANNUAL"].includes(plan);
  const isEnterprise = isActive && ["ENTERPRISE_MONTH", "ENTERPRISE_ANNUAL"].includes(plan);
  const isFreeTrial = isActive && plan === "FREE";

  const getPro = async () => {
    if (!user) return { redirect: "/auth/login?returnUrl=/product/pricing" };
    if (isPro || isEnterprise) return { message: "You already have an active Pro subscription." };

    return { redirect: "/product/pricing" };
  };

  const value = useMemo<SubscriptionContextProps>(() => ({
    subscription,
    loading: subQuery.isLoading,

    isActive,
    isPro,
    isEnterprise,
    isFreeTrial,
    interval,

    refresh: async () => { await subQuery.refetch(); },
    cancel: async () => cancel.mutateAsync(),    
    upgradeToCheckout: async (planId: string) => (await upgradeToCheckout(planId)).url,
    startFreeTrial: async (days) => startTrial.mutateAsync(days || 14),
    getPro,
  }), [
    subscription,
    isActive,
    isPro,
    isEnterprise,
    isFreeTrial,
    interval,
  ]);

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
}
