"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/auth";
import { apiPatch } from "@/lib/axios";
import { GenericAPIRes } from "@/types/axios";
import { useSession } from "next-auth/react";

export const useMuteNotifications = () => {
  const { user } = useAuth();
  const { update } = useSession();

  const [mute, setMute] = useState<boolean>(
    user?.data?.muteNotifications ?? false
  );

  const [muteLoading, setMuteLoading] = useState(false);

  useEffect(() => {
    setMute(user?.data?.muteNotifications ?? false);
  }, [user?.data?.muteNotifications]);

  const updateMute = useCallback(
    async (nextValue: boolean) => {
      if (!user?.id) {
        throw new Error("User is not available");
      }

      const previousValue = mute;

      setMute(nextValue);
      setMuteLoading(true);

      try {
        const res: GenericAPIRes = await apiPatch(
          `/user/${user.id}`,
          {
            data: {
              muteNotifications: nextValue,
            },
          }
        );

        if (!res?.ok) {
          throw new Error("Failed to update notification mute setting");
        }

        await update();
        return true;
      } catch (error) {
        setMute(previousValue);
        throw error;
      } finally {
        setMuteLoading(false);
      }
    },
    [user?.id, mute]
  );

  const muteNotifications = useCallback(
    () => updateMute(true),
    [updateMute]
  );

  const unmuteNotifications = useCallback(
    () => updateMute(false),
    [updateMute]
  );

  const toggleMute = useCallback(
    () => updateMute(!mute),
    [updateMute, mute]
  );

  return {
    mute,
    muteNotifications,
    unmuteNotifications,
    toggleMute,
    muteLoading,
  };
};
