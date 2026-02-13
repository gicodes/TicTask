"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import * as teamsApi from "@/lib/teams";

export function useTeam() {
  const { teamId } = useParams() as { teamId?: string };
  const router = useRouter();
  const { showAlert } = useAlert();

  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTeam = useCallback(async () => {
    if (!teamId) return;

    try {
      setLoading(true);

      const teamRes = await teamsApi.getTeam(Number(teamId));
      const membersRes = await teamsApi.getTeamMembers(Number(teamId));

      setTeam({
        ...teamRes.team,
        members: membersRes.members,
      });
    } catch (err) {
      console.error(err);
      setTeam(null);
    } finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  const inviteMember = async (email: string) => {
    if (!teamId) return false;

    try {
      await teamsApi.inviteToTeam({
        email,
        teamId: Number(teamId),
      });

      showAlert("Invitation sent!", "success");
      await fetchTeam();
      return true;
    } catch {
      showAlert("Failed to send invitation", "error");
      return false;
    }
  };

  const removeMember = async (userId: number) => {
    if (!teamId) return false;

    try {
      await teamsApi.removeTeamMember({
        teamId: Number(teamId),
        userId,
      });

      showAlert("Member removed", "success");
      await fetchTeam();
      return true;
    } catch {
      showAlert("Failed to remove member", "error");
      return false;
    }
  };

  const dissolveTeam = async () => {
    if (!teamId) return false;

    if (!confirm("Are you sure you want to dissolve this team?"))
      return false;

    try {
      await teamsApi.dissolveTeam(Number(teamId));
      showAlert("Team dissolved", "success");
      router.replace("/dashboard/teams");
      return true;
    } catch {
      showAlert("Failed to dissolve team", "error");
      return false;
    }
  };

  return {
    team,
    loading,
    fetchTeam,
    inviteMember,
    removeMember,
    dissolveTeam,
  };
}