'use client';

import GenericDashboardPagesHeader from '../_level_1/genDashPagesHeader'
import GenericGridPageLayout from '../_level_1/genGridPageLayout';
import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title={'Marketing'} 
        description={'Manage Advertisements, PR and Marketing Campaigns under one house'}
      />
      <Box py={5} textAlign={{ xs: 'center' }}>
        <Typography color='error'>Marketing is currently unavailable</Typography>
      </Box>
    </GenericGridPageLayout>
  )
}

export default Page;