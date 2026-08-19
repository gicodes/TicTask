import { apiPatch } from "@/lib/axios";
import { useAuth } from "@/providers/auth";
import { useState, useCallback } from "react";
import { GenericAPIRes } from "@/types/axios";
import { useSession } from "next-auth/react";

export const useUpdateEmailNotifSetting = () => {
  const { user } = useAuth();
  const { update } = useSession();

  const [tNotifsLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEmailNotifications = useCallback(
    async (next: boolean) => {
      if (!user?.id) {
        const message = "User not signed in";
        setError(message);
        throw new Error(message);
      }

      try {
        setLoading(true);
        setError(null);

        const payload = {
          data: {
            getTNotifsViaEmail: next,
          },
        };

        const res: GenericAPIRes = await apiPatch(
          `/user/${user.id}`,
          payload
        );

        await update();

        return res.data;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to update email notifications";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  return {
    updateEmailNotifications,
    tNotifsLoading,
    error,
  };
};