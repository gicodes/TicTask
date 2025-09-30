'use client';

import React from 'react';
import { Role } from '@/types/user';
import SignInOptions from './signInOptions';
import { AuthDivider } from './orAuthDivider';
import { CredentialsForm } from './credentialsForm';
import { NonUserSignInFields } from './adminLogin';
import { Box, Stack, Typography } from '@mui/material';

interface LoginProps {
  name?: string | null;
  role?: Role;
}

export const Login = ({
  name, role
}: LoginProps) => {

  const isUser = role === "USER";

  return (
    <Box mt={5} minHeight={'75vh'}>
      <Box p={2} mx={'auto'} maxWidth={1200}>
        <Stack mt={5} gap={2} mx={'auto'} maxWidth={500}>
          <Stack gap={1} textAlign={'center'} py={1}>
            <Typography variant='h4'>Welcome Back{name ? `, ${name}` : isUser ? '' : "Admin"}</Typography>
            <Typography variant='subtitle2'>Login to view, assign and complete Tickets</Typography>
          </Stack>

        { isUser ? 
          <>
            <SignInOptions />
            <AuthDivider />
            <CredentialsForm /> 
          </>
          : <NonUserSignInFields />
        }
        </Stack>
      </Box>
    </Box>
  );
};