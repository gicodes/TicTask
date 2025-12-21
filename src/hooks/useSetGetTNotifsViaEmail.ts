import { apiPatch } from "@/lib/axios";
import { useAuth } from "@/providers/auth";
import { useState, useCallback } from "react";
import { GenericAPIRes } from "@/types/axios";

export const useUpdateEmailNotifSetting = (params?: number) => {
  const { user } = useAuth();
  const [tNotifsLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let userId: number | undefined;

  if (!params) userId = user?.id
  else userId = params;

  const updateEmailNotifications = useCallback(
    async (enabled: boolean) => {
      try {
        setLoading(true);
        setError(null);
          
        const payload = { 
          user: { 
            data: { 
              getTNotifsViaEmail: enabled 
            }
          }
        };

        const res: GenericAPIRes = await apiPatch(
          `/user/${userId}`, 
          payload
        );
        return res.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update email notifications");
        return null;
      } finally {
        setLoading(false);
      }
    }, [userId]
  );

  return { 
    updateEmailNotifications, 
    tNotifsLoading, 
    error 
  };
};
