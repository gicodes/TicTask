import { apiPost } from "@/lib/api";
import { useAuth } from "@/providers/auth";
import { Subscription } from "@/types/users";
import { SubscriptionRes } from "@/types/axios";

export function useGetPro() {
  const { user } = useAuth();

  const getPro = async  (id: number) => {
    if (!id) return null;

    const res = await apiPost<SubscriptionRes>(`/subscription`, {
      id,
      plan: 'PRO',
      duration: 30 // Re-using this hook means duration will be open to more 30+ days
    });

    let subscription: Subscription | undefined | null;

    if (res.ok && res.data===null) subscription = user?.subscription
    if (res.ok) subscription = res.data
      else subscription = null;

    return subscription;
  }

  return { getPro };
}
