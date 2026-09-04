"use client";

import { 
  signOut,
  useSession,
} from "next-auth/react";
import { useEffect } from "react";

export function SessionErrorWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      if (process.env.NODE_ENV !== "production") console.error("Refresh Access Token Error.");
      
      if (session.user.lastLoginAt) {
        const lastLoginTime = new Date(session.user.lastLoginAt).getTime();
        const currentTime = new Date().getTime();
        const hoursElapsed = (currentTime - lastLoginTime) / (1000 * 60 * 60);
        
        if (hoursElapsed > 24) {
          if (process.env.NODE_ENV !== "production") console.error("Signed out more than 24 hrs");
          signOut();
        }
      }
    }
  }, [session?.error]);

  return null;
}