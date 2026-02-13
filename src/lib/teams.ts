import { UpdateTeamPayload } from "@/types/team";
import { getSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(path: string, options?: RequestInit) {
  const session = await getSession();
  const accessToken = (session)?.accessToken;

  const res = await fetch(`${BASE_URL}/team${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "Something went wrong");
  }

  return data;
}

export const createTeam = (payload: { name: string; description?: string }) =>
  request("/", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getAllTeams = () =>
  request("/get-all");

export const getMyTeams = () =>
  request("/", {
    method: "GET",
  });

export const getTeam = (teamId: number) =>
  request(`/${teamId}`);

export const getTeamMembers = (teamId: number) =>
  request(`/${teamId}/members`);

export const getTeamAnalytics = async (teamId: number) => {
  return request(`/${teamId}/analytics`)
};

export const updateTeamInfo = async (
  teamId: number,
  data: UpdateTeamPayload
) => {
  return request(`/${teamId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
};

export const inviteToTeam = (payload: { email: string; teamId: number }) =>
  request(`/invite`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const acceptInvite = (payload: { token: string }) =>
  request("/accept-invite", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const leaveTeam = async (teamId: number) => {
  request(`/${teamId}/leave`, {
    method: "POST",
  });
};

export const removeTeamMember = (payload: { teamId: number; userId: number }) =>
  request(`/${payload.teamId}/members/remove`, {
    method: "DELETE",
    body: JSON.stringify(payload),
  });

export const dissolveTeam = (teamId: number) =>
  request(`/${teamId}`, {
    method: "DELETE",
  });
