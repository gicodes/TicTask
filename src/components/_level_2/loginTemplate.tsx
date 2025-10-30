import { Box, Stack, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authErrorMessages } from '@/lib/authOptions';
import { LoginTemplateProps } from '@/types/auth';
import RememberMe from '../_level_1/rememberMe';
import styles from '@/app/page.module.css';
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
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const message = (error && authErrorMessages[error]) || authErrorMessages.Default;
  
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

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
        <Box display="flex" justifyContent="space-between">
          <Typography px={1} variant="caption" color="info.main">
            <Link href="/auth/forgot-password">Forgot Password?</Link>
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
          className={`full-width ${styles.btnPrimary}`}
        >
          {submitting ? 'Signing in...' : 'Sign in with Email'}
        </button>
      </Stack>
    </Box>
  );
};

export default LoginTemplate;