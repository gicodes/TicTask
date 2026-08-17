"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export function SessionErrorWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/login" });
    }
  }, [session?.error]);

  return null;
}