'use client'

import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Box, Typography } from '@mui/material';
import PlannerPage from '../_level_3/planner'
import { useAuth } from '@/providers/auth';

const Page = () => {
  const { login } = useAuthRedirect();
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography>Please <span onClick={login} className='custom-link'>log in</span> to view planner</Typography>
    </Box>
  );
  
  return (<PlannerPage />)
}

export default Page