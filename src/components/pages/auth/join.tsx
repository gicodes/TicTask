'use client';

import { useEffect, useState } from 'react';

import { apiPost } from "@/lib/api";
import { Role } from '@/types/user';
import { signIn } from 'next-auth/react';
import styles from "@/app/page.module.css";
import SignInOptions from './signInOptions';
import { AuthDivider } from './orAuthDivider';
import { 
   Box,
  Stack,
  Fade,
  Card,
  CardActionArea,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import Link from 'next/link';
import { VerifyEmailResponse, VerifyEmailRequest } from '@/types/axios'

type UserType = 'personal' | 'business';

export const Join = ({ roleParam }: { roleParam: Role }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>('USER');
  const [userType, setUserType] = useState<UserType>('personal');
  const [formData, setFormData] = useState({
    email: '', 
    password: '', 
    name: '' 
  });

  useEffect(() => {
    if (roleParam === 'ADMIN') setRole('ADMIN');
    else setRole('USER');
  }, [roleParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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

      const data = await apiPost<VerifyEmailResponse, VerifyEmailRequest>(
        "/auth/verify-email",
        payload
      );

      console.log("Verification mail sent:", data.message);

      if (role === "ADMIN") {
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: "/dashboard/admin",
        });
      } else {
        // For USER, redirect or show onboarding instruction
        window.location.href = "/verify"; 
      }
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
              <Divider sx={{ bgcolor: 'silver', width: 180, mx: 'auto', my: 1 }} />
            </Box>

            {role === 'USER' ? (
              <Fade in timeout={500}>
                <Box mt={10}>
                  <Typography textAlign="center" fontWeight={600}>
                    Choose Account Type
                  </Typography>
                  <RadioGroup
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 2,
                      flexDirection: 'row',
                      mt: 2,
                    }}
                  >
                    {['personal', 'business'].map((type) => (
                      <Card
                        key={type}
                        elevation={userType === type ? 6 : 2}
                        sx={{
                          borderRadius: 3,
                          bgcolor:
                            userType === type
                              ? 'var(--foreground)'
                              : 'rgb(36, 34, 43)',
                          color: userType === type ? 'black' : 'white',
                          transition: 'all 0.25s ease',
                          width: 130,
                          "&:hover": { 
                            boxShadow: 6, 
                            border: userType === type ? "1px solid white" : "2px solid darkorange", 
                            bgcolor: userType === type ? "#383838" : '', 
                            color: userType === type ? 'white' : '', 
                            transform: "translateY(-2px)",
                          },
                          display: 'grid',
                          justifyContent: 'center'
                        }}
                      >
                        <CardActionArea>
                          <FormControlLabel
                            value={type}
                            control={<Radio sx={{ display: 'none' }} />}
                            label={
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                textAlign="center"
                                py={2}
                              >
                                {type === 'personal'
                                  ? 'Personal'
                                  : 'Organization'}
                              </Typography>
                            }
                            sx={{ m: 0 }}
                          />
                        </CardActionArea>
                      </Card>
                    ))}
                  </RadioGroup>
                </Box>
              </Fade>
            ): 
              <Typography fontWeight={600} textAlign={'center'}> Quick Sign up in Seconds</Typography>
            }

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
                  <span>{error && (
                    <Typography color="error" fontSize="0.9rem">
                      {error}
                    </Typography>
                  )}
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`min-width-100 ${styles.btnAction}`}
                  >
                    {loading ? 'Processing...' : 'Verify Email'}
                  </button>
                </Box>
              </Box>
            </Fade>
          </Stack>
        </Box>

        {role === 'USER' && (
          <>
            <AuthDivider />
            <SignInOptions />
          </>
        )}

        <Stack
          mt={10}
          gap={2}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Typography variant="subtitle2">
            Have an account? &nbsp;
            <Link href={`/auth/login`}>Login here</Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};