'use client'

import { useMutation } from '@tanstack/react-query';
import { loadStripe, type Stripe } from '@stripe/stripe-js';

const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
);

interface CheckoutResponse {
  sessionId: string;
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: async (plan: string): Promise<CheckoutResponse> => {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      return res.json();
    },
    onSuccess: async (data) => {
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Stripe not initialized');
        return;
      }

      const result = await stripe;
      console.log(data, result);

      // const result = await stripe.redirectToCheckout({
      //   sessionId: data.sessionId,
      // });

      // if (result.error) {
      //   console.error(result.error.message);
      // }
    },
  });
}
