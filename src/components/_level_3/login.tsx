'use client';

import Link from 'next/link';
import { Role } from '@/types/users';
import SSOArea from '../_level_1/signInOptions';
import { AdminLogin } from '../_level_2/adminLogin';
import { Box, Stack, Typography } from '@mui/material';
import { AuthDivider } from '../_level_1/orAuthDivider';
import { CredentialsForm } from '../_level_2/userLogin';

interface LoginProps { 
  role?: Role; 
}

export const Login = ({role}: LoginProps) => {
  const isUser = role === "USER";

  return (
    <Box mt={5} minHeight={'75vh'}>
      <Box p={2} mx={'auto'} maxWidth={1200}>
        <Stack my={5} gap={2} mx={'auto'} maxWidth={500}>
          <Stack gap={1} textAlign={'center'} py={1}>
            <Typography variant='h4'>Login to continue</Typography>
          </Stack>
          { isUser ? 
            <>
              <CredentialsForm /> 
              <AuthDivider />
              <SSOArea />
            </>
            : (role === "ADMIN" || role === "AGENT") && <AdminLogin />
          }
        </Stack>

        <Typography variant="subtitle2" textAlign={'center'}>
          Don&apos;t have an account? &nbsp;
          <Link 
            href={`/auth/join/user`} 
            style={{ 
              paddingBottom: 5, 
              borderBottom: '1px solid var(--special)'
            }}
          >
            Register here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};