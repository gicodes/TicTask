'use client';

import { useState } from 'react';
import { Role } from '@/types/user';
import { signIn } from 'next-auth/react';
import styles from "@/app/page.module.css";
import { useRouter } from 'next/navigation';
import SignInOptions from './signInOptions';
import { AuthDivider } from './orAuthDivider';
import { 
  Box, 
  Stack, 
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardActionArea, 
  TextField,
  Typography, 
  Divider
} from '@mui/material';
import Link from 'next/link';

const descriptions: Record<string, string> = {
  USER: "Create a standard user account using your personal email",
  AGENT: "Register as a TicTask Agent with a professional account",
  ADMIN: "Register as TicTask Admin. Verify your email to gain full access",
};

export const Join = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<Role>('USER');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/auth/${role.toLowerCase()}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Registration failed');

      if (role === 'AGENT') {
        localStorage.setItem('token', data.token);
        router.push(`/api/auth/${role.toLowerCase()}/join/onboarding`);
      } else {
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: true,
          callbackUrl: '/dashboard',
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else setError('An unexpected error occurred');
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
          <Stack spacing={2.5} mx={'auto'}>
            <Box 
              py={1} 
              gap={2}  
              mx={'auto'} 
              textAlign={'center'}
              display={'grid'} 
              justifyContent={'center'}
            >
              <Typography variant="h4" fontWeight={600}> Join TicTask </Typography>
              <Divider sx={{ bgcolor: 'silver', width: 180, mx: 'auto' }}/>
              <Typography variant='h6'>Choose A Role</Typography>
            </Box>

            <Box>
              <RadioGroup
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                sx={{
                  display: "flex",
                  gap: 2,
                  my: 3,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {["USER", "AGENT"].map((r) => (
                  <Card
                    key={r}
                    elevation={role === r ? 6 : 2}
                    sx={{
                      borderRadius: 3,
                      bgcolor: role === r ? "var(--foreground)" : "rgb(36, 34, 43)",
                      transition: "all 0.25s ease",
                      width: 125,
                      height: 'auto',
                      color: role === r ? "black" : "white",
                      "&:hover": {
                        boxShadow: 6,
                        border: role === r ? "1px solid darkorange" : "2px solid white",
                        bgcolor: role === r ? "#383838" : '',
                        color: role === r ? 'white' : '',
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardActionArea>
                      <FormControlLabel
                        value={r}
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: role === r ? 700 : 500,
                              textAlign: "center",
                              py: 2,
                            }}
                          >
                            {r === "USER" && "USER"}
                            {r === "AGENT" && "AGENT"}
                          </Typography>
                        }
                        sx={{ width: "100%", m: 0, justifyContent: "center" }}
                      />
                    </CardActionArea>
                  </Card>
                ))}
              </RadioGroup>
              <Typography
                variant="body2"
                textAlign="center"
              >
                {descriptions[role]}
              </Typography>
            </Box>

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
              <button 
                type="submit" 
                disabled={loading} 
                className={styles.btnAction}
              >
                {loading ? 'Sending OTP...' : `Get OTP`}
              </button>
            </Box>
          </Stack>
        </Box>  

        { role==="USER" ? 
        <>
          <AuthDivider />
          <SignInOptions />
        </> :
        <Stack 
          mt={10} 
          gap={2}  
          display={'flex'} 
          direction={'row'} 
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <Typography variant='subtitle2'>Have an Account? &nbsp; <Link href={'/auth/agent/login'}>Login here</Link></Typography>
          <Typography variant='subtitle2'> <Link href={'/auth/forgot-password'}>Forgot Password?</Link></Typography>
        </Stack> 
        }
      </Box>
    </Box>
  );
};
