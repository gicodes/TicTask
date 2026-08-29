"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function SessionErrorWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      if (process.env.NODE_ENV !== "production") console.error("Signed out with callbackUrl:");
      // signOut({ callbackUrl }); x
    }
  }, [session?.error]);

  return null;
}