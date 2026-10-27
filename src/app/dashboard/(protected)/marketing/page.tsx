'use client';

import Link from 'next/link';
import { Button } from '@/assets/buttons';
import { Box, Chip, Stack, Typography } from '@mui/material';
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader';

const Page = () => {
  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title={'Marketing'} 
        description={'Manage Advertisements, PR and Marketing Campaigns under one house'}
      />
      <Box maxWidth={600} mt={2}>
        <Button disabled>
          Social Media Marketing
        </Button>
        <Stack mt={2} spacing={2} direction={'row'}>
          {['Instagram', 'Facebook', 'X', 'LinkedIn'].map((i) => (
            <Chip key={i} label={i} />
          ))}
        </Stack>
      </Box>

      <Box maxWidth={600} mt={2}>
        <Button disabled>
          Meta Ads
        </Button>
        <Stack mt={2} spacing={2} direction={'row'}>
          {['Instagram', 'Facebook', 'Whatsapp'].map((i) => (
            <Chip key={i} label={i} />
          ))}
        </Stack>
      </Box>

      <Box maxWidth={600} mt={2}>
        <Button disabled>
          Google Ads
        </Button>

        <Typography mt={3}> Google Ads are unavailable right now. Raise Funds and try again!</Typography>
      </Box>

      <Box maxWidth={600}>
        <Button component={Link} href={'/reviews'} tone='action'>
          Go to reviews
        </Button>
      </Box>
      
    </GenericGridPageLayout>
  )
}

export default Page;