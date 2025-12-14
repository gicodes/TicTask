import { useState, useCallback } from "react";
import { apiPatch } from "@/lib/axios";
import { UserStatus } from "@/types/users";
import { useAlert } from "@/providers/alert";

interface UpdateStatusPayload {
  status: UserStatus;
  statusUntil?: string;
}

export function useUpdateUserStatus(userId: number) {
  const { showAlert } = useAlert();
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

        showAlert("Status updated successfully", "success");
        window.location.reload();
      } catch (err) {
        setError("Failed to update status");
        showAlert("Status failed to update", "error");
        throw err;
      } finally {
        setLoading(false);
      }
    }, [userId]
  );

  return {
    updateStatus,
    loading,
    error,
  };
}
