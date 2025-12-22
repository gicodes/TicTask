'use client';

import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader'
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import { Box, Typography } from '@mui/material';

const Page = () => {
  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title={'Partners'} 
        description={'Partner records, inbound messages and pending outbound messages from partners'} 
      />
      <Box py={5} textAlign={{ xs: 'center', sm: 'left' }}>
        <Typography color='warning'>No partner records available</Typography>
      </Box>
    </GenericGridPageLayout>
  )
}

export default Page;