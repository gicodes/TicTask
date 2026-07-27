'use client';

import { useEffect } from 'react';
import { getSession } from 'next-auth/react';

export function useSessionKeeper(interval = 10 * 60 * 1000) {
  useEffect(() => {
    const refresh = async () => {
      if (
        !navigator.onLine ||
        document.visibilityState !== 'visible'
      ) {
        return;
      }

      try {
        await getSession();
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Session refresh failed", err);
        }
        // Feature updates will report once to Sentry
      }
    };

    refresh();

    const id = setInterval(refresh, interval);

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };

    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [interval]);
}