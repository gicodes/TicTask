'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './auth';
import { apiGet } from '@/lib/api';
import { SubscriptionRes } from '@/types/axios';

interface SubscriptionContextProps {
  subscription: SubscriptionRes | null;
  isPro: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextProps>({
  subscription: null,
  isPro: false,
  loading: true,
  refresh: async () => {},
});

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionRes | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const data: SubscriptionRes = await apiGet(`/subscriptions/${user.id}`);
      setSubscription(data);
    } catch (err) {
      console.error('Failed to load subscription', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isPro: subscription?.plan === 'Pro' && subscription?.active,
        loading,
        refresh: fetchSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
