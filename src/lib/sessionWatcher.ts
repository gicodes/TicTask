"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function SessionErrorWatcher() {
  const { data: session } = useSession();
    const { getLoginUrl } = useAuthRedirect();


  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: getLoginUrl() });
    }
  }, [session?.error]);

  return null;
}