'use client'

import AuthRedirectBtn from '@/assets/authRedirectBtn';
import { Box, Typography } from '@mui/material';
import PlannerPage from '../_level_3/planner'
import { useAuth } from '@/providers/auth';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography>Please <AuthRedirectBtn /> to view planner</Typography>
    </Box>
  );
  
  return (<PlannerPage />)
}

export default Page