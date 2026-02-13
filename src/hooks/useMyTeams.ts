"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import * as teamsApi from "@/lib/teams";

export function useMyTeams() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      const res = await teamsApi.getMyTeams();
      setTeams(res.teams ?? []);
    } catch (err) {
      console.error(err);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const createTeam = async (payload: {
    name: string;
    description?: string;
  }) => {
    try {
      const res = await teamsApi.createTeam(payload);
      showAlert("Team created successfully", "success");

      await fetchTeams();
      router.push(`/dashboard/teams/${res.team.id}`);

      return true;
    } catch (err: any) {
      showAlert(err?.message || "Failed to create team", "error");
      return false;
    }
  };

  const acceptInvite = async (token: string) => {
    try {
      await teamsApi.acceptInvite({ token });
      showAlert("Joined team successfully", "success");
      await fetchTeams();
      return true;
    } catch (err: any) {
      showAlert(err?.message || "Failed to accept invite", "error");
      return false;
    }
  };

  return {
    teams,
    loading,
    fetchTeams,
    createTeam,
    acceptInvite,
  };
}
