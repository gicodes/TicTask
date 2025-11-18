import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const session = await getSession();
  const accessToken = (session as Session)?.accessToken;

  const headers = new Headers(init?.headers as HeadersInit);

  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");

  let res = await fetch(input, { ...init, headers, credentials: "include" });

  if (res.status === 401) {
    const r = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });
    
    if (r.ok) {
      const sessUpdate = await fetch("/api/auth/session?update");
      
      if (!sessUpdate) console.warn(sessUpdate);

      const session2 = await getSession();
      const newAccess = (session2 as Session)?.accessToken;

      if (newAccess) {
        headers.set("Authorization", `Bearer ${newAccess}`);
        res = await fetch(input, { ...init, headers, credentials: "include" });
      }
    }
  }

  return res;
}
