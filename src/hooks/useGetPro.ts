import { apiPost } from "@/lib/api";
import { SubscriptionRes } from "@/types/axios";
import { Subscription } from "@/types/users";

export async function getPro(id: number) {
  if (!id) return null;

  console.log("NEW USER REQUEST: Get pro")
  const getProRes = await apiPost<SubscriptionRes>(`/subscription`, {
    id,
    plan: 'PRO',
    duration: 30 // Re-using this hook means duration will be open to more 30+ days
  });
  console.log(getProRes);

  let subscription: Subscription | null;

  if (getProRes.ok)  subscription = getProRes.data
    else subscription = null;

  return subscription;
}