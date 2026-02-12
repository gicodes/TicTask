'use client'

import PlannerPage from '../_level_3/planner'
import { useAuth } from '@/providers/auth';
import { Box, Link, Typography } from '@mui/material';

const Page = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return <Box textAlign="center" p={4}>Loading...</Box>;

  if (!isAuthenticated) return (
    <Box textAlign="center" p={4}>
      <Typography>Please <Link href={'/auth/login'} className='custom-link'>log in</Link> to view planner</Typography>
    </Box>
  );
  
  return (<PlannerPage />)
}

export default Page