"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiPost, apiDelete } from "@/lib/api";
import { GenericAPIRes } from "@/types/axios";
import { useAlert } from "@/providers/alert";
import { Team, User } from "@/types/users";
import { useAuth } from "@/providers/auth";

export function useTeam() {
  const { user } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();
  const { teamId } = useParams() as { teamId?: string };

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const ownedTeams = (user as User)?.createdTeams ?? [];
    const membershipTeams = (user as User)?.teamMemberships?.map(m => m.team) ?? [];
    const allTeams = [...ownedTeams, ...membershipTeams];

    if (!teamId) {
      setTeam(null);
      setLoading(false);
      return;
    }

    const found = allTeams.find(t => t.id === Number(teamId)) ?? null;

    setTeam(found);
    setLoading(false);

  }, [user, teamId]);

  const inviteToTeam = useCallback(
    async (email: string) => {
      if (!team) return false;

      try {
        const payload = { email, teamId: team.id, userId: user?.id };

        const res: GenericAPIRes = await apiPost("/team/invite", payload);

        if (!res.ok) {
          showAlert("Failed to send invitation", "error");
          return false;
        }

        showAlert("Invitation sent!", "success");
        return true;
      } catch (err) {
        console.error("Invite failed:", err);
        showAlert("Error sending invitation", "error");
        return false;
      }
    }, [team, user, showAlert]
  );

  const removeFromTeam = useCallback(
    async (memberUserId: number) => {
      if (!team) return false;

      try {
        const res: GenericAPIRes = await apiPost("/team/remove", {
          teamId: team.id,
          memberUserId,
        });

        if (!res.ok) {
          showAlert("Failed to remove member", "error");
          return false;
        }

        showAlert("Member removed", "success");

        return true;
      } catch (err) {
        console.error("Remove member error:", err);
        showAlert("Error removing member", "error");
        return false;
      }
    }, [team, showAlert]
  );

  const dissolveTeam = useCallback(async () => {
    if (!team) return false;

    try {
      const res: GenericAPIRes = await apiDelete(`/team/${team.id}`);

      if (!res.ok) {
        showAlert("Failed to dissolve team", "error");
        return false;
      }

      showAlert("Team dissolved", "success");

      router.replace("/dashboard/team");
      return true;
    } catch (err) {
      console.error("Dissolve team error:", err);
      showAlert("Error dissolving team", "error");
      return false;
    }
  }, [team, showAlert, router]);

  return {
    team,
    teamId: team?.id ?? null,
    loading,
    inviteToTeam,
    removeFromTeam,
    dissolveTeam,
  };
}
