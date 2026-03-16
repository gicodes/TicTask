'use client';

import { useEffect } from "react";
import { getSession } from "next-auth/react";

export default function useSessionKeeper(interval = 60_000) {
  useEffect(() => {
    let active = true;

    const refreshSession = async () => {
      if (!active) return;

      try {
        await getSession();
      } catch (err) {
        console.error("Session refresh failed", err);
      }
    };

    refreshSession();

    const id = setInterval(refreshSession, interval);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, [interval]);
}