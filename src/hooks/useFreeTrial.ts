import { apiPost } from "@/lib/api";
import { Subscription } from "@/types/users";
import { SubscriptionRes } from "@/types/axios";

export async function startTrial(id: number) {
  if (!id) return null;

  const res = await apiPost<SubscriptionRes>(`/subscription`, {
    id,
    plan: 'TRIAL',
    duration: 14,
  });

  if (!res.ok) {
    console.error('Failed to start trial');
    return null;
  }

  return res.data as Subscription;
}
