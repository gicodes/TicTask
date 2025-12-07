import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const session = await getSession();
  const accessToken = (session as Session & { accessToken?: string })?.accessToken;

  const headers = new Headers(init?.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  headers.set("Content-Type", "application/json");

  let res = await fetch(input, { 
    ...init, 
    headers, 
    credentials: "include" 
  });

  if (res.status === 401) {
    try {
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include", 
      });

      if (refreshRes.ok) {
        const { accessToken: newToken } = await refreshRes.json();
        
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: newToken }),
        });

        headers.set("Authorization", `Bearer ${newToken}`);
        res = await fetch(input, {
          ...init,
          headers,
          credentials: "include",
        });
      } else {
        await signOut({ redirect: false });
        window.location.href = "/login";
        return new Response(null, { status: 401 });
      }
    } catch (err) {
      console.error("Token refresh failed:", err);
      await signOut({ redirect: false });
      window.location.href = "/login";
      return new Response(null, { status: 401 });
    }
  }
}

export async function api<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await apiFetch(input, init);

  if (!res?.ok) {
    const text = await res?.text();
    throw new Error(`API Error ${res?.status}: ${text || "Request failed"}`);
  }

  return res.json() as Promise<T>;
}