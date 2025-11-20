import { Box, Stack, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { forgotPassword } from '@/hooks/useForgotPass';
import { authErrorMessages } from '@/lib/authErrorMsg';
import { LoginTemplateProps } from '@/types/auth';
import RememberMe from '../_level_1/rememberMe';
import { useAlert } from '@/providers/alert';
import { Button } from '@/assets/buttons';
import React, { useState } from 'react';
import Link from 'next/link';

const LoginTemplate = ({
  email,
  password,
  error,
  submitting,
  handleSubmit,
  setEmail,
  setPassword,
}: LoginTemplateProps) => {
  const { showAlert } = useAlert();
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const message = (error && authErrorMessages[error]) || authErrorMessages.Default;
  
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const handleForgotPassword = () => {
    if (!email) {
      showAlert("Provide an email for password reset!", "warning"); 
      return;
    }

    forgotPassword({email})
      .then(() => showAlert("Password reset link sent to your email!", "success"))
      .catch(() => showAlert("Something went wrong!", "error"))
  }

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
          fullWidth  required
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth required
          type={showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Box display="flex" justifyContent="space-between">
          <Typography px={1} variant="caption" color="info.main">
            <Link href="#" onClick={handleForgotPassword}>Forgot Password?</Link>
          </Typography>
          <RememberMe remember={remember} setRemember={setRemember} />
        </Box>
        {error && (<Typography color="error" fontSize="0.9rem">{message}</Typography>)}
        <Button
          type="submit"
          fullWidth
          disabled={submitting}
        >
          {submitting ? 'Signing in...' : 'Sign in with Email'}
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginTemplate;