"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Team, Analytics, UpdateTeamPayload } from "@/types/team";
import { useAlert } from "@/providers/alert";
import { useAuth } from "@/providers/auth";
import * as teamsApi from "@/lib/teams";

export function useTeam() {
  const { teamId } = useParams() as { teamId?: string };
  const router = useRouter();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const [team, setTeam] = useState<Team>(null);
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

  const fetchAnalytics = async () => {
    if (!team?.id) return;
    const data = await teamsApi.getTeamAnalytics(team.id);

    setAnalytics(data);
  };

  const updateTeam = async (data: UpdateTeamPayload) => {
    const updated = await teamsApi.updateTeamInfo(team?.id!, data);
        
    window.location.reload();
    setTeam(updated);
  };

  const leaveCurrentTeam = async () => {
    await teamsApi.leaveTeam(team?.id!);

    showAlert("You have left the team!", 'success')
    router.push("/dashboard");
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
    isOwner,
    fetchTeam,
    analytics,
    fetchAnalytics,
    updateTeam,
    leaveCurrentTeam,
    inviteMember,
    removeMember,
    dissolveTeam,
  };
}