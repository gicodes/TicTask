'use client';

import Link from 'next/link';
import { apiPost } from "@/lib/api";
import { Role } from '@/types/users';
import styles from "@/app/page.module.css";
import { useEffect, useState } from 'react';
import SignInOptions from './signInOptions';
import { useRouter } from 'next/navigation';
import { useAlert } from '@/providers/alert';
import { AuthDivider } from './orAuthDivider';
import { VerifyEmailResponse, VerifyEmailRequest } from '@/types/axios'
import { Box, Stack, Fade, TextField, Typography, Divider, Card } from '@mui/material';

export const Join = ({ roleParam }: { roleParam: Role }) => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>('USER');
  const [formData, setFormData] = useState({
    email: '', 
    password: '', 
    name: '' 
  });

  useEffect(() => {
    if (roleParam === 'ADMIN') setRole('ADMIN');
    else setRole('USER');
  }, [roleParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload: VerifyEmailRequest = {
        email: formData.email,
        role,
        ...(role === "ADMIN" ? { name: formData.name, password: formData.password } : {}),
      };

      await apiPost<VerifyEmailResponse, VerifyEmailRequest>(
        "/auth/verify-email",
        payload
      );

      showAlert("A verification email has been sent to your inbox. Please verify to continue.", "info");
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}&role=${role}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="75vh" maxWidth={1200} mx="auto">
      <Box mt={5} p={2} maxWidth={500} mx="auto">
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          p={{ xs: 1.2, sm: 1.5, md: 2 }}
        >
          <Stack spacing={2.5}>
            <Box textAlign="center" py={1}>
              <Typography variant="h4" fontWeight={600}>
                Join TicTask
              </Typography>
              <Divider sx={{ bgcolor: 'silver', width: 180, mx: 'auto', my: 2 }} />
              <Typography fontWeight={501} textAlign={'center'}> Quick Sign up in Seconds</Typography>
            </Box>

            <Card 
              sx={{ 
                px: { xs: 1, md: 2 }, 
                boxShadow: 3, 
                borderRadius: { xs: 2, md: 3 }, 
                py: { xs: 1.5, md: 2} 
              }}
            >
              <Fade in timeout={600}>
                <Box display={'grid'} gap={2}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ bgcolor: 'whitesmoke', borderRadius: 2 }}
                    fullWidth required
                  />

                  { role === "ADMIN" && <>
                    <Typography mt={3}>Let us know your preferred name(s)</Typography>
                    <TextField
                      label="Full Name"
                      name="name"
                      type="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2 }}
                      fullWidth required
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      value={formData.password}
                      onChange={handleChange}
                      sx={{ bgcolor: 'whitesmoke', borderRadius: 2 }}
                      fullWidth required
                    />
                  </>}

                  <Box display="flex" gap={2} justifyContent="space-between" pt={2}>
                    <span>{error && (<Typography color="error" variant='caption'>{error}</Typography>)}</span>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`min-width-150 ${styles.btnAction}`}
                    >
                      {loading ? 'Processing...' : 'Verify Email'}
                    </button>
                  </Box>
                </Box>
              </Fade>
            </Card>
          </Stack>
        </Box>

        {role === 'USER' && <>
          <AuthDivider />
          <SignInOptions />
        </>}

        <Stack mt={10} gap={2}
          direction="row" justifyContent="space-around" alignItems="center"
        >
          <Typography variant="subtitle2"> Have an account? &nbsp;
            <Link href={`/auth/login`}>Login here</Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};