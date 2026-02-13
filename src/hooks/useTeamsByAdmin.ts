"use client";

import { useState, useEffect, useCallback } from "react";
import { useAlert } from "@/providers/alert";
import * as teamsApi from "@/lib/teams";

export function useTeamByAdmin() {
  const { showAlert } = useAlert();

  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTeams = useCallback(async () => {
    try {
      setLoading(true);
      const res = await teamsApi.getAllTeams();
      setTeams(res.teams ?? []);
    } catch (err) {
      console.error(err);
      showAlert("Failed to fetch teams", "error");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetchAllTeams();
  }, [fetchAllTeams]);

  const deleteTeam = async (teamId: number) => {
    if (!confirm("Delete this team?")) return false;

    try {
      await teamsApi.dissolveTeam(teamId);
      showAlert("Team deleted", "success");
      await fetchAllTeams();
      return true;
    } catch (err) {
      showAlert("Failed to delete team", "error");
      return false;
    }
  };

  return {
    teams,
    loading,
    fetchAllTeams,
    deleteTeam,
  };
}
