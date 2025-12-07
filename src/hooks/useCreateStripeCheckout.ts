'use client';

import { apiPost } from '@/lib/axios';
import { useAuth } from '@/providers/auth';
import { useMutation } from '@tanstack/react-query';
import { StripeCheckOutSessionRequest, StripeCheckOutSessionResponse } from '@/types/axios';

export function useCreateCheckoutSession() {
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async (plan: string) => {
      if (!user?.id) throw new Error("User not authenticated");
      const body: StripeCheckOutSessionRequest = { userId: user.id, plan };
      const res = await apiPost<StripeCheckOutSessionResponse, StripeCheckOutSessionRequest>(
        "/subscription/stripe/checkout",
        body
      );
      if (!res.ok || !res.data?.url) {
        throw new Error(res.error?.message || "Failed to create checkout session");
      }
      return res.data;
    },
    onSuccess: (data) => {
      window.location.replace(data.url);
    },
  });

  return mutation;
}
