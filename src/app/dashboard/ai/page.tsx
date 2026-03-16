'use client'

import React from 'react'
import { useAuth } from '@/providers/auth';
import { Box, Typography } from '@mui/material';
import AiChatPanel from '../_level_2/aiChatPanel';
import AuthRedirectBtn from '@/assets/authRedirectBtn';

const Page = () => {
  const {loading, isAuthenticated } = useAuth();

  if (loading) return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography>Please <AuthRedirectBtn />  to access AI assistant</Typography>
    </Box>
  );
  
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1000,
        minHeight: '100vh',
        borderRadius: 3,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

    <Box flex={1} p={2} overflow="auto">
      <AiChatPanel fullRender={true} />
    </Box>
    </Box>
  )
}

export default Page;