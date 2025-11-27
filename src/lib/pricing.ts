import { Plan } from "@/types/subscription";

export const PLAN_IDS = {
  pro: {
    monthly: "PRO_MONTH",
    yearly: "PRO_ANNUAL",
  },
  enterprise: {
    monthly: "ENTERPRISE_MONTH",
    yearly: "ENTERPRISE_ANNUAL",
  },
};

export function resolveIntervalFromPlan(plan: Plan): "monthly" | "yearly" {
  if (plan.includes("_MONTH")) return "monthly";
  if (plan.includes("_ANNUAL")) return "yearly";

  return "monthly";
}
