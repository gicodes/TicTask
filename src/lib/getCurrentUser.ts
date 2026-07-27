import { User } from "@/types/users";
import { apiGet, nextAuthApiGet } from "./axios";
import { GenericAPIRes } from "@/types/axios";

export async function getCurrentUser(accessToken: string) {
  const res = await nextAuthApiGet<GenericAPIRes>("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok || !res.user) {
    throw new Error(res.message ?? "Unable to fetch current user");
  }

  return res.user as User;
}