'use client';

import { useAuth } from './auth';
import { apiGet } from '@/lib/api';
import { Subscription } from '@/types/users';
import { SubscriptionRes } from '@/types/axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface SubscriptionContextProps {
  subscription: Subscription | null;
  isPro: boolean;
  isFreeTrial: boolean;
  isEnterprise: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextProps>({
  subscription: null,
  isPro: false,
  isFreeTrial: false,
  isEnterprise: false,
  loading: true,
  refresh: async () => {},
});

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    try {
      const data: SubscriptionRes = await apiGet(`/subscription/${user?.id}`);
      if (data.ok && !data.data) setSubscription(null);
      else setSubscription(data.data);
    } catch (err) {
      console.error('Failed to load subscription', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [user, fetchSubscription]);

  const plan = subscription?.plan?.toUpperCase() || 'FREE';

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isPro: plan === 'PRO' && (subscription?.active || false),
        isFreeTrial: plan === 'TRIAL' && (subscription?.active || false),
        isEnterprise: plan === 'ENTERPRISE' && (subscription?.active) || false,
        loading,
        refresh: fetchSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
