import { apiPost } from "@/lib/api";
import { useAuth } from "@/providers/auth";
import { Subscription } from "@/types/users";
import { SubscriptionRes } from "@/types/axios";

export function useStartTrial() {
  const { user } = useAuth();

  const startTrial = async (id: number) => {
    if (!id) return null;

    const res = await apiPost<SubscriptionRes>(`/subscription`, {
      id,
      plan: 'FREE',
      duration: 14,
    });

    let subscription: Subscription | undefined | null;

    if (res.ok && res.data === null) subscription = user?.subscription;
    if (res.ok) subscription = res.data as Subscription
      else subscription = null

    return subscription;
  };

  return { startTrial };
}
