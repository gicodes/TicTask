import { Ticket } from "@/types/ticket";
import { getSession } from "next-auth/react";
import { UpdateTeamPayload } from "@/types/team";
import { CreateTeamTicketPayload } from "../types/team";

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

export const getTeamTickets = (teamId: number): Promise<Ticket[]> => {
  return request(`/${teamId}/tickets`);
}

export const getTeamTicket = (teamId: number, ticketId: number): Promise<Ticket> => {
  return request(`/${teamId}/tickets/${ticketId}`);
}

export const createTeamTicket = (
  teamId: number,
  data: CreateTeamTicketPayload
): Promise<Ticket> => {
  return request(`/${teamId}/tickets`, {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export const updateTeamTicket = (
  teamId: number,
  ticketId: number,
  data: Partial<Ticket>
): Promise<Ticket> => {
  return request(`/${teamId}/tickets/${ticketId}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}

export const deleteTeamTicket = (teamId: number, ticketId: number) => {
  return request(`/${teamId}/tickets/${ticketId}`, {
    method: "DELETE"
  });
}

export const getCommentOnTeamTicket = (teamId: number, ticketId: number ) => {
  return request(`/${teamId}/tickets/${ticketId}/comments`)
}

export const commentOnTeamTicket = (
  teamId: number, 
  ticketId: number, 
  data: unknown
) => {
  return request(`/${teamId}/tickets/${ticketId}/comments`, {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export const getHistoryOnTeamTicket = (teamId: number, ticketId: number ) => {
  return request(`/${teamId}/tickets/${ticketId}/history`)
}