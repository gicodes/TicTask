'use client';

import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader'
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title={'Teams As Organizations'} 
        description={'Manage Standard, Pro and Enterprise-level teams as organizations'} 
      />
      <Box py={5} textAlign={{ xs: 'center' }}>
        <Typography color='error'>Organizations are currently unavailable</Typography>
      </Box>
    </GenericGridPageLayout>
  )
}

export default Page;