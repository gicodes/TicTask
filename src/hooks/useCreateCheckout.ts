'use client';

import { useMutation } from '@tanstack/react-query';
import { apiPost } from '@/lib/api';
import { useAuth } from '@/providers/auth';
import { StripeCheckOutSessionRequest, StripeCheckOutSessionResponse } from '@/types/axios';

interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export function useCreateCheckoutSession() {
  const { user } = useAuth();

  const mutation = useMutation<CheckoutResponse, Error, string>({
    mutationFn: async (plan: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const checkOutCredentials: StripeCheckOutSessionRequest = {
        userId: user.id,
        plan,
      };

      const res = await apiPost<StripeCheckOutSessionResponse, StripeCheckOutSessionRequest>(
        '/subscription/stripe/checkout',
        checkOutCredentials
      );

      if (!res.ok || !res.data?.url) {
        throw new Error(res.error?.message || 'Failed to create checkout session');
      }

      return res.data;
    },

    onSuccess: async (data) => {
      // ✅ New standard: redirect via session URL
      window.location.replace(data.url);
    },
  });

  return mutation;
}
