import { Box, Stack, TextField, Typography } from '@mui/material';
import { authErrorMessages } from '@/lib/authOptions';
import RememberMe from '../_level_1/rememberMe';
import styles from '@/app/page.module.css';
import React, { useState } from 'react';
import Link from 'next/link';

interface LoginTemplateProps {
  email: string;
  password: string;
  error?: string;
  submitting?: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

const LoginTemplate = ({
  email,
  password,
  error,
  submitting,
  handleSubmit,
  setEmail,
  setPassword,
}: LoginTemplateProps) => {
  const [remember, setRemember] = useState(false);
  const message = (error && authErrorMessages[error]) || authErrorMessages.Default;

  return (
    <Box
      component="form"
      borderRadius={4}
      bgcolor="white"
      pt={1.5}
      width="100%"
      onSubmit={handleSubmit}
    >
      <Stack spacing={2} p={{ xs: 1.2, sm: 1.5, md: 2 }}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography px={1} variant='caption' color='info.main'>
            <Link href={'/auth/forgot-password'}>Forgot Password?</Link>
          </Typography>
          <RememberMe remember={remember} setRemember={setRemember} />
        </Box>

        {error && (
          <Typography color="error" fontSize="0.9rem">
            {message}
          </Typography>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`full-width ${styles.btnInverted}`}
        >
          {submitting ? 'Signing in...' : 'Sign in with Email'}
        </button>
      </Stack>
    </Box>
  );
};

export default LoginTemplate;