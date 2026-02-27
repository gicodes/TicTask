import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/auth";

type TicketLimits = {
  limit: number;
  used: number;
  remaining: number;
  isTeamActive: boolean;
  plan: string;
};

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export function useTicketLimits() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery<TicketLimits>({
    queryKey: ["ticket-limits", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("Not authenticated");
      const res = await fetch(`${SERVER_URL}/tickets/user/${user.id}/limit`);
      if (!res.ok) throw new Error("Failed to fetch limits");
      return res.json();
    },
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000,
  });

  const refreshLimits = () => {
    if (user?.id) {
      queryClient.invalidateQueries({ queryKey: ["ticket-limits", user.id] });
    }
  };

  return {
    ...query,
    refreshLimits,
  };
}