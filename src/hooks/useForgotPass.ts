import { apiPost } from "@/lib/axios";
import { GenericAPIRes } from "@/types/axios";

export async function forgotPassword({ email }: { email: string }) {
  if (!email) return null;

  const res: GenericAPIRes = await apiPost("/auth/forgot-password", { email });
  if (res.ok) return true;
  else return false;
}