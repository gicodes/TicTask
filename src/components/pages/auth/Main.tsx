'use client';

import React from 'react';
import { Role } from '@/types/user';
import { AdminLogin } from './adminLogin';
import SignInOptions from './signInOptions';
import { AuthDivider } from './orAuthDivider';
import { CredentialsForm } from './userLogin';
import { Box, Stack, Typography } from '@mui/material';

interface LoginProps { role?: Role; }

export const Login = ({role}: LoginProps) => {
  const isUser = role === "USER";

  return (
    <Box mt={5} minHeight={'75vh'}>
      <Box p={2} mx={'auto'} maxWidth={1200}>
        <Stack mt={5} gap={2} mx={'auto'} maxWidth={500}>
          <Stack gap={1} textAlign={'center'} py={1}>
            <Typography variant='h4'>Welcome, Login</Typography>
          </Stack>

        { isUser ? 
          <>
            <SignInOptions />
            <AuthDivider />
            <CredentialsForm /> 
          </>
          : (role === "ADMIN" || role === "AGENT") && <AdminLogin />
        }
        </Stack>
      </Box>
    </Box>
  );
};
