'use client';

import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader'
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title={'Subscriptions & Revenue'} 
        description={'All Subscribed users and teams are currated here with special options for revenue sorting'} 
      />
      <Box py={5} textAlign={{ xs: 'center', sm: 'left' }}>
        <Typography color='warning'>Finances are currently unavailable</Typography>
      </Box>
    </GenericGridPageLayout>
  )
}

export default Page;