"use client";

import { apiPost } from "@/lib/api";
import styles from "@/app/page.module.css";
import { useState, useEffect } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export const AuthVerifyPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const role = params.get("role") || "USER";
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResend = async () => {
    if (!email) return setError("Missing email");
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      const res = await apiPost<{ message: string }, { email: string; role: string }>(
        "/auth/resend-verification",
        { email, role }
      );
      setInfo(res.message);
      setTimeLeft(15 * 60);
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message);
      } else {
        setError("Failed to resend verification email");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => router.push(`/auth/join/${role}`);

  const expired = timeLeft <= 0;

  return (
    <Box className={`${styles.container} ${styles.mid}`}>
      <Stack mt={10} mb={5}>
        <Typography variant="h4" fontWeight={600}>Verify your email</Typography>
        <Divider sx={{ width: 234, mx: 'auto', bgcolor: 'white', my: 2}} />
      </Stack>

      <Typography>
        We&apos;ve sent a verification link to <strong>{email || "your inbox"}</strong>.
      </Typography>
      <Typography>Click the link in your inbox to continue.</Typography>

      <Typography sx={{ mt: 3, fontWeight: "bold" }}>
        {expired
          ? "Verification link has expired. Please resend."
          : `Link valid for: ${formatTime(timeLeft)}`}
      </Typography>

      <Stack className={styles.actions}>
        <button
          type="button"
          className={`min-width-180 ${styles.btnAction}`}
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "Resending..." : "Resend Email"}
        </button>
        <button
          type="button"
          className={`min-width-180 ${styles.btnWarm}`}
          onClick={handleChangeEmail}
        >
          Change Email
        </button>
      </Stack>

      {info && <Typography color="green">{info}</Typography>}
      {error && <Typography color="red">{error}</Typography>}
      <Typography>Didn&apos;t find an email yet? Check your spam folder.</Typography>
    </Box>
  );
};
