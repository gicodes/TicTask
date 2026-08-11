"use client";

import { Team, Analytics, UpdateTeamPayload } from "@/types/team";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { useAuth } from "@/providers/auth";
import * as teamsApi from "@/lib/teams";

export function useTeam() {
  const router = useRouter();
  const { user } = useAuth();
  const { showAlert, confirm } = useAlert();
  const { teamId } = useParams() as { teamId?: number };
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwner = user?.id === team?.ownerId;

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

  const inviteMember = async (email: string, userId: number) => {
    if (!teamId) return false;

    try {
      await teamsApi.inviteToTeam({
        email,
        teamId: Number(teamId),
        invitedById: Number(userId)
      });

      showAlert("Invitation sent!", "success");
      await fetchTeam();
      return true;
    } catch {
      showAlert("Failed to send invitation", "error");
      return false;
    }
  };

  const fetchAnalytics = async (opts?: { range?: "7d" | "30d" | "90d" }) => {
    if (!teamId) return;
    const range = opts?.range ?? "30d";
    const data = await teamsApi.getTeamAnalytics(teamId, range);
    setAnalytics(data);
  };

  const updateTeam = async (data: UpdateTeamPayload) => {
    const updated = await teamsApi.updateTeamInfo(team?.id!, data);
        
    window.location.reload();
    setTeam(updated);
  };

  const leaveCurrentTeam = async () => {
    const ok = await confirm(
      "Are you sure you want to leave this team?",
      "Confirm Team Exit",
      "Leave Now"
    )
    if (!ok) return false;

    await teamsApi.leaveTeam(team?.id!);

    showAlert("You have left the team!", 'success')
    router.push("/dashboard/teams");
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

    const ok = await confirm(
      "Are you sure you want to dissolve this team?",
      "Confirm dissolve team",
      "Dissolve"
    )
    if (!ok) return false;

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
    isOwner,
    fetchTeam,
    analytics,
    updateTeam,
    inviteMember,
    removeMember,
    dissolveTeam,
    fetchAnalytics,
    leaveCurrentTeam,
  };
}