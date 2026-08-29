"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function SessionErrorWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      if (process.env.NODE_ENV !== "production") console.error("Signed out with callbackUrl:");
      
      if (session.user.lastLoginAt) {
        const lastLoginTime = new Date(session.user.lastLoginAt).getTime();
        const currentTime = new Date().getTime();
        const hoursElapsed = (currentTime - lastLoginTime) / (1000 * 60 * 60);
        
        if (hoursElapsed > 24) {
          signOut();
        }
      }
    }
  }, [session?.error]);

  return null;
}