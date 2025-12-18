import { apiPatch } from "@/lib/axios";
import { UserStatus } from "@/types/users";
import { useAlert } from "@/providers/alert";
import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";

interface UpdateStatusPayload {
  status: UserStatus;
  statusUntil?: string;
}

export function useUpdateUserStatus(userId: number) {
  const { showAlert } = useAlert();
  const { update: updateSession } = useSession(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = useCallback(
    async (payload: UpdateStatusPayload) => {
      setLoading(true);
      setError(null);

      try {
        await apiPatch(`/user/${userId}`, {
          data: {
            status: payload.status,
            statusUntil: payload.statusUntil,
          },
        });

        await updateSession({
          user: {
            status: payload.status,
            statusUntil: payload.statusUntil,
          },
        });

        showAlert(
          `Your status is now set to ${payload.status.toLowerCase()}!`,
          "success"
        );
      } catch (err) {
        setError("Failed to update status");
        showAlert("Status failed to update", "error");
        throw err;
      } finally {
        setLoading(false);
      }
    }, [userId, updateSession, showAlert]
  );

  return {
    updateStatus,
    loading,
    error,
  };
}
