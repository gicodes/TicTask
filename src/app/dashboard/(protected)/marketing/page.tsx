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

      <Button component={Link} href={'/dashboard/admin/reviews'}>
        Go to reviews
      </Button>
    </GenericGridPageLayout>
  )
}

export default Page;