import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) console.error("NEXT_PUBLIC_API_URL is not set!");

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const session = await getSession();
  const accessToken = (session as Session)?.accessToken;

  const headers = new Headers(init?.headers ?? {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  headers.set("Content-Type", "application/json");

  const url = typeof input === "string" && input.startsWith("http")
    ? input
    : `${API_URL}${input}`;

  let response = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    try {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const { accessToken: newToken } = await refreshRes.json();

        await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: newToken }),
        });

        headers.set("Authorization", `Bearer ${newToken}`);
        response = await fetch(url, {
          ...init,
          headers,
          credentials: "include",
        });
      } else {
        await signOut({ redirect: false });
        window.location.href = "/auth/login";
        return new Response(null, { status: 401 });
      }
    } catch (err) {
      console.error("Refresh failed:", err);
      await signOut({ redirect: false });
      window.location.href = "/auth/login";
      return new Response(null, { status: 401 });
    }
  }

  return response;
}

export async function api<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await apiFetch(input, init);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text || "Request failed"}`);
  }

  return res.json() as Promise<T>;
}