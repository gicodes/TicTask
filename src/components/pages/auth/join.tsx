'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from "@/app/page.module.css";
import { useRouter } from 'next/navigation';
import SignInOptions from './signInOptions';
import { AuthDivider } from './orAuthDivider';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';

interface JoinProps {
  role: 'USER' | 'AGENT' | 'ADMIN';
}

export const Join = ({ role }: JoinProps) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (role === 'USER') {
        const res = await fetch(`${SERVER_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, role }),
        });

        if (!res.ok) throw new Error('User registration failed');
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: '/dashboard',
        });
      } else {
        const res = await fetch(`${SERVER_URL}/auth/register/${role.toLowerCase()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, role }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Registration failed');

        localStorage.setItem('token', data.token);
        router.push(`/${role.toLowerCase()}/dashboard`);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight={'75vh'} maxWidth={1200} mx={'auto'}>
      <Box mt={5} p={2} maxWidth={500} mx={'auto'}>
        <Box
          component="form"
          p={{ xs: 1.2, sm: 1.5, md: 2}}
          onSubmit={handleSubmit}
          bgcolor="inherit"
          color='inherit'
          width="100%"
        >
          <Stack spacing={2}>
            <Stack spacing={1} textAlign="center" pb={3}>
              <Typography variant="h5" fontWeight={600}>
                Join TicTask
              </Typography>
              <Typography variant='subtitle2'> 
                {`Submit and verify your email to continue setup for ${role === 'USER' ? 'user account' : role === 'AGENT' ? 'Agent account for managing tasks' : 'Admin account with full access'}`}
              </Typography>
            </Stack>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ bgcolor: 'whitesmoke', borderRadius: 2}}
            />

            <Box display={'flex'} pt={1} justifyContent={'right'}>
              { error && <Typography my={1} color="error">{error}</Typography>}
              <Button variant="contained" type="submit" disabled={loading} className={styles.btnPrimary}>
                {loading ? 'Sending OTP...' : `Get OTP`}
              </Button>
            </Box>
          </Stack>
        </Box>  

        <AuthDivider />
        <SignInOptions />
      </Box>
    </Box>
  );
};