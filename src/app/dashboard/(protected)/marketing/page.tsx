'use client';

import Link from 'next/link';
import { Button } from '@/assets/buttons';
import { Box, Typography } from '@mui/material';
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader';

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

      <Box maxWidth={600}>
        <Button component={Link} href={'/dashboard/admin/reviews'}>
          Go to reviews
        </Button>
      </Box>
      
    </GenericGridPageLayout>
  )
}

export default Page;