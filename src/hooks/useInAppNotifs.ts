"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/auth";
import { apiPatch } from "@/lib/axios";
import { GenericAPIRes } from "@/types/axios";
import { useSession } from "next-auth/react";

export const useUpdateInAppNotifSetting = () => {
  const { user } = useAuth();
  const { update } = useSession();

  const [inAppNotifications, setInAppNotifications] = useState<boolean>(
    user?.data?.getInAppNotifs ?? true
  );

  const [inAppNotifsLoading, setInAppNotifsLoading] = useState(false);

  useEffect(() => {
    setInAppNotifications(user?.data?.getInAppNotifs ?? true);
  }, [user?.data?.getInAppNotifs]);

  const updateInAppNotifications = useCallback(
    async (enabled: boolean) => {
      if (!user?.id) {
        throw new Error("User is not available");
      }

      const previousValue = inAppNotifications;

      setInAppNotifications(enabled);
      setInAppNotifsLoading(true);

      try {
        const res: GenericAPIRes = await apiPatch(
          `/user/${user.id}`,
          {
            data: {
              getInAppNotifs: enabled,
            },
          }
        );

        if (!res?.ok) {
          throw new Error("Failed to update in-app notification setting");
        }

        await update()
        return true;;
      } catch (error) {
        setInAppNotifications(previousValue);
        throw error;
      } finally {
        setInAppNotifsLoading(false);
      }
    },
    [user?.id, inAppNotifications]
  );

  return {
    inAppNotifications,
    updateInAppNotifications,
    inAppNotifsLoading,
  };
};