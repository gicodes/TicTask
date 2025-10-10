"use client";

import styles from '@/app/page.module.css';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { apiPost } from '@/lib/api';

const VerifyPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const role = params.get("role") || "USER";

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err: any) {
      setError(err.message || "Failed to resend verification email");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    router.push(`/auth/register?role=${role}`); // or `/auth/signup`
  };

  return (
    <Box className={`${styles.container} ${styles.mid}`}>
      <Stack my={5} display={'grid'} gap={2}>
        <span className={styles.mid}>
          <RiCheckboxCircleFill color={'lightblue'} size={50} className={styles.outerCircle}/>
        </span>
        <Typography variant='h3'>Verify your email</Typography>
        <Divider />
      </Stack>

      <Typography>
        We&apos;ve sent a verification link to <strong>{email}</strong>.
      </Typography>
      <Typography>Click the link in your inbox to continue.</Typography>

      <Stack className={styles.actions}>
        <button
          type="button"
          className={`min-width-100 ${styles.btnAction}`}
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? "Resending..." : "Resend Email"}
        </button>
        <button
          type="button"
          className={`min-width-100 ${styles.btnRetreat}`}
          onClick={handleChangeEmail}
        >
          Change Email
        </button>
      </Stack>

      {info && <Typography color="green">{info}</Typography>}
      {error && <Typography color="red">{error}</Typography>}
      <Typography>Didn&apos;t get it yet? Check your spam folder.</Typography>
    </Box>
  );
};

export default VerifyPage;
