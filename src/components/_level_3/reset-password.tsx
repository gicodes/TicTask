'use client'

import { useState } from 'react';
import { apiPost } from '@/lib/api';
import { useAlert } from '@/providers/alert';
import { GenericAPIRes } from '@/types/axios';
import { useSearchParams, useRouter } from "next/navigation";
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Box, Card, Stack, TextField, InputAdornment, Typography, IconButton } from '@mui/material';
import { Button } from '@/assets/buttons';

const ResetPassword = () => {
  const router = useRouter();
  const { showAlert } = useAlert();
  const params = useSearchParams();
  const token = params.get('token');

  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const res: GenericAPIRes = await apiPost("/auth/reset-password", {
        token, password
      });
      
      if (res.ok) {
        showAlert("Password Reset Successfully!", "success");
        router.push('/dashboard')
      }
      else setError(res.message);
    } catch {
      showAlert("Something went wrong. Please try again!", "warning");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitting) return <Box py={10} textAlign={'center'}>Loading...</Box>

  return (
    <Box py={12} maxWidth={'sm'} mx={'auto'}>
      <Card sx={{ mx: 'auto', p: 2}}>
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={2} p={{ xs: 1.2, sm: 1.5, md: 2 }}>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && (
              <Typography color="error" fontSize="0.9rem">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              disabled={submitting}
              sx={{ margin: '0 auto'}}
            >
              {submitting ? 'Resetting Password...' : 'Reset Password'}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  )
}

export default ResetPassword
