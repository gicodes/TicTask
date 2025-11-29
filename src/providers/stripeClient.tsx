'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { SubscriptionProvider } from './subscription';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminApolloProvider } from '@/app/dashboard/admin/_level_1/graphQL';

const queryClient = new QueryClient();
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminApolloProvider>
        <SubscriptionProvider>
          <Elements stripe={stripePromise}>{children}</Elements>
        </SubscriptionProvider>
      </AdminApolloProvider>
    </QueryClientProvider>
  );
}