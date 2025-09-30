'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation';
import { Box, Stack, TextField, Typography } from '@mui/material';

export const CredentialsForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error || 'Invalid credentials');
      setSubmitting(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Box 
      component="form" 
      borderRadius={4} 
      bgcolor={'white'} 
      pt={2} width="100%"
      onSubmit={handleSubmit}
    >
      <Stack 
        spacing={2} 
        p={{ xs: 1.2, sm: 1.5, md: 2}}
      >
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

        {error && (
          <Typography color="error" fontSize="0.9rem">
            {error}
          </Typography>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={styles.btnInverted}
        >
          {submitting ? 'Signing in...' : 'Sign in with Email'}
        </button>
      </Stack>
    </Box>
  );
};
