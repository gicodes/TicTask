"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export function SessionErrorWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.log("[NEW] session watcher: signing out...")
      signOut({ callbackUrl: "/auth/login" });
    }
  }, [session?.error]);

  return null;
}