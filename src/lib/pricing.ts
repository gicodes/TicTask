import { Plan } from "@/types/subscription";

export const PLAN_IDS = {
  pro: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_PRO_MM!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_PRO_YY!,
  },
  enterprise: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_ENT_MM!,
    yearly: process.env.NEXT_PUBLIC_STRIPE_PLAN_ID_ENT_YY!,
  },
};

export function resolveIntervalFromPlan(plan: Plan): "monthly" | "yearly" {
  if (plan.includes("_MONTH")) return "monthly";
  if (plan.includes("_ANNUAL")) return "yearly";

  return "monthly";
}
