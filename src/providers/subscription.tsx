'use client';

import { useAuth } from "@/providers/auth";
import { apiGet, apiPost } from "@/lib/axios";
import type { 
  Subscription, 
  Plan, 
  SubscriptionContextProps, 
  GetSubAPIResponse, 
  Interval, 
  PaymentProvider 
} from "@/types/subscription";
import { GenericAPIRes } from "@/types/axios";
import React, { createContext, useContext, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
        const res: GetSubAPIResponse = await apiGet(`/subscription/${user.id}`);
        return res?.data.subscription;
      } catch {
        return null;
      }
    },
  });

  const subscription = subQuery.data ?? null;

  const startTrial = useMutation<Subscription, unknown, number>({
    mutationFn: async (days = 14) => {
      if (!user?.id) throw new Error("Not authenticated");
      const res = await apiPost<GenericAPIRes>("/subscription", {
        id: user.id,
        plan: "FREE",
        duration: days,
      });
      if (!res.ok) throw new Error(res.error?.message || "Failed to start trial");
      return res.data as Subscription;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription", user?.id] }),
  });

  const checkoutMutation = useMutation<
    { authorization_url?: string; url?: string },
    unknown,
    { plan: Plan; billingCycle?: Interval; provider?: PaymentProvider }
  >({
    mutationFn: async ({ plan, billingCycle = "monthly", provider = "paystack" }) => {
      if (!user?.id) throw new Error("Not authenticated");

      const res = await apiPost<GenericAPIRes>("/subscription/checkout", {
        userId: user.id,
        plan,
        billingCycle,
        provider,
      });

      if (!res.ok || !res.data) throw new Error(res.error?.message || "Checkout failed");
      return res.data;
    },
  });

  const cancel = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error("Not authenticated");
      const res = await apiPost<GenericAPIRes>("/subscription/cancel", { id: user.id });
      if (!res.ok) throw new Error(res.error?.message || "Cancel failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription", user?.id] }),
  });

  const plan = (subscription?.plan ?? "FREE") as Plan;
  const billingCycle = (subscription?.billingCycle as Interval) || undefined;

  const isActive =
    !!subscription?.active &&
    (subscription.expiresAt ? new Date(subscription.expiresAt) > new Date() : true);

  const isPro = isActive && plan === "PRO";
  const isEnterprise = isActive && plan === "ENTERPRISE";
  const isFreeTrial = isActive && plan === "FREE";

  const upgradeToCheckout = async (plan: Plan, cycle: Interval = "monthly") => {
    const data = await checkoutMutation.mutateAsync({ plan, billingCycle: cycle });
    const redirectUrl = data.authorization_url || data.url;

    if (redirectUrl) {
      window.location.href = redirectUrl;
      return redirectUrl;
    }
    return undefined;
  };

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
    billingCycle,

    refresh: async () => { await subQuery.refetch(); },
    upgradeToCheckout,
    cancel: () => cancel.mutateAsync(),
    startFreeTrial: (days) => startTrial.mutateAsync(days || 14),
    getPro,
  }), [
    subscription,
    isActive,
    isPro,
    isEnterprise,
    isFreeTrial,
    billingCycle,
    subQuery,
    cancel,
    startTrial,
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