import { Session } from "next-auth";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) console.error("NEXT_PUBLIC_API_URL is not set!");

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const session = await getSession();
  const accessToken = (session as Session)?.accessToken;

  const headers = new Headers(init?.headers ?? {});

  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  headers.set("Content-Type", "application/json");

  const url = typeof input === "string" && input.startsWith("http")
    ? input
    : `${API_URL}${input}`;

  return fetch(url, {
    ...init,
    headers,
    credentials: "include",
  });
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