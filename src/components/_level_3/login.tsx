'use client';

import Link from 'next/link';
import { Role } from '@/types/users';
import SSOArea from '../_level_1/signInOptions';
import { AdminLogin } from '../_level_2/adminLogin';
import { AuthDivider } from '../_level_1/orAuthDivider';
import { CredentialsForm } from '../_level_2/userLogin';
import { Box, Stack, Typography, useTheme } from '@mui/material';

export const Login = ({ roleParam }: { roleParam: Role }) => {
  const isUser = roleParam === "USER";
  const theme = useTheme();

  return (
    <Box mt={5} minHeight={'75vh'}sx={{ bgcolor: theme.palette.mode}}>
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
            : (roleParam === "ADMIN" || roleParam === "AGENT") && <AdminLogin />
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
