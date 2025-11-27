'use client';

import { useAuth } from "@/providers/auth";
import { apiGet, apiPost } from "@/lib/api";
import type { Subscription } from "@/types/subscription";
import React, { createContext, useContext } from "react";
import { 
  useQuery, 
  useMutation, 
  useQueryClient 
} from "@tanstack/react-query";
import type { 
  GenericAPIRes, 
  StripeCheckOutSessionRequest, 
  StripeCheckOutSessionResponse, 
  StripeCheckOutSessionResponseData
} from "@/types/axios";
import { resolveIntervalFromPlan } from "@/lib/pricing";

interface SubscriptionContextProps {
  subscription: Subscription | null;
  loading: boolean;
  isPro: boolean;
  isFreeTrial: boolean;
  isEnterprise: boolean;

  refresh: () => Promise<void>;
  cancelSubscription: () => Promise<boolean>;
  upgradeToCheckout: (priceId: string) => Promise<{ url: string }>;
  startFreeTrial: (durationDays?: number) => Promise<Subscription | null>;
}

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: subscription, isLoading, refetch } = useQuery<Subscription | null>({
    queryKey: ["subscription", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const res = await apiGet<GenericAPIRes>(`/subscription/${user.id}`);
      if (!res.ok) throw new Error(res.error?.message || "Failed to load subscription");

      return (res.data as Subscription) ?? null;
    },
    enabled: !!user?.id,
    staleTime: 60 * 1000,
  });

  const startTrial = useMutation<Subscription | null, Error, number>({
    mutationFn: async (durationDays = 14) => {
      if (!user?.id) throw new Error("Not authenticated");

      const res = await apiPost<GenericAPIRes>(`/subscription`, {
        id: user.id,
        plan: "FREE",
        duration: durationDays,
      });
      if (!res.ok) throw new Error(res.error?.message || "Failed to start trial");

      return (res.data as Subscription) ?? null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscription", user?.id] });
    },
  });

  const createCheckout = useMutation<
    StripeCheckOutSessionResponseData,
    Error,
    string
  >({
    mutationFn: async (planId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      const body: StripeCheckOutSessionRequest = {
        userId: user.id,
        plan: planId,
      };

      const res = await apiPost<
        StripeCheckOutSessionResponse, 
        StripeCheckOutSessionRequest
      >("/subscription/stripe/checkout", body);

      if (!res.ok || !res.data)
        throw new Error(res.error?.message || "Failed to create checkout session");

      return res.data;
    },
  });
  
  const cancelSub = useMutation<boolean, Error>({
    mutationFn: async () => {
      if (!user?.id) throw new Error("Not authenticated");

      const res = await apiPost<GenericAPIRes>("/subscription/cancel", { id: user.id });
      if (!res.ok) throw new Error(res.error?.message || "Failed to cancel subscription");

      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subscription", user?.id] }),
  });

  const plan = (subscription?.plan ?? "FREE").toUpperCase();
  const isActive = !!subscription?.active;
  if (isActive) subscription.interval = resolveIntervalFromPlan(subscription.plan) ?? 14;

  const ctxValue: SubscriptionContextProps = {
    subscription: subscription ?? null,
    loading: isLoading,
    isPro: plan === "PRO" && isActive,
    isFreeTrial: plan === "FREE" && isActive,
    isEnterprise: plan === "ENTERPRISE" && isActive,

    refresh: async () => {
      await refetch();
    },

    startFreeTrial: async (days = 14) => {
      return await startTrial.mutateAsync(days);
    },

    upgradeToCheckout: async (priceId: string) => {
      const data = await createCheckout.mutateAsync(priceId);
      return { url: data.url };
    },

    cancelSubscription: async () => {
      await cancelSub.mutateAsync();
      return true;
    },
  };

  return (
    <SubscriptionContext.Provider value={ctxValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
};
