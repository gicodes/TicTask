const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}/team${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

export const createTeam = (payload: { name: string; description?: string }) =>
  request("/", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getTeam = (teamId: number) =>
  request(`/${teamId}`);



export const getTeamMembers = (teamId: number) =>
  request(`/${teamId}/members`);

export const inviteToTeam = (payload: { email: string; teamId: number }) =>
  request(`/invite`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const removeTeamMember = (payload: { teamId: number; userId: number }) =>
  request(`/${payload.teamId}/members/remove`, {
    method: "DELETE",
    body: JSON.stringify(payload),
  });

export const dissolveTeam = (teamId: number) =>
  request(`/${teamId}`, {
    method: "DELETE",
  });
