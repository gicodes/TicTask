"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export function SessionErrorWatcher() {
  const { data: session } = useSession();
  const { getLoginUrl } = useAuthRedirect();
  const callbackUrl = getLoginUrl();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      if (process.env.NODE_ENV !== "production") console.error("Signed out with callbackUrl:", callbackUrl);
      // signOut({ callbackUrl });
    }
  }, [session?.error]);

  return null;
}