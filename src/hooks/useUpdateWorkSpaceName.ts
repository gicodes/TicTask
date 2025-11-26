import { apiPatch } from "@/lib/api";
import { useAuth } from "@/providers/auth";
import { useState, useCallback } from "react";
import { GenericAPIRes } from "@/types/axios";

export const useUpdateWorkspaceName = (param?: number) => {
  const { user } = useAuth();

  let userId: number | undefined;

  if (!param) {
    userId = user?.id
  } else userId = param;

  const [wSNLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateWorkspaceName = useCallback(
    async (name: string) => {
    
    try {
      setLoading(true);
      setError(null);

      const payload = { workSpaceName: name };

      const res: GenericAPIRes = await apiPatch(`/user/${userId}`, payload);
        return res?.data;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update workspace name");
        return null;
      } finally {
        setLoading(false);
      }
    }, [userId]
  );

  return { updateWorkspaceName, wSNLoading, error };
};
