'use client';

import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const NonUserSignInFields = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || 'Login failed');

      localStorage.setItem('token', data.token);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box 
      component="form" 
      borderRadius={4} 
      bgcolor={'white'} 
      pt={1.5} width="100%"
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

        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          sx={{ textTransform: 'none' }}
        >
          { submitting ? 'Signing in...' : 'Sign in as Agent/ Admin' }
        </Button>
      </Stack>
    </Box>
  );
};
