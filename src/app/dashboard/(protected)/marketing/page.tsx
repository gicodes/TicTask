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

      <Stack spacing={5} py={2.5}>
        <Box maxWidth={600}>
          <Button disabled>
            Social Media Marketing
          </Button>
          <Stack mt={2} spacing={2} direction={'row'}>
            {['Instagram', 'Facebook', 'X', 'LinkedIn'].map((i) => (
              <Chip key={i} label={i} />
            ))}
          </Stack>
        </Box>

        <Box maxWidth={600}>
          <Button disabled>
            Meta Ads
          </Button>
          <Stack mt={2} spacing={2} direction={'row'}>
            {['Instagram', 'Facebook', 'Whatsapp'].map((i) => (
              <Chip key={i} label={i} />
            ))}
          </Stack>
        </Box>

        <Box maxWidth={600}>
          <Button disabled>
            Google Ads
          </Button>

          <Stack mt={2}>
            <Typography variant='caption'> Google Ads are unavailable right now. Raise Funds and try again!</Typography>
          </Stack>
        </Box>

        <Box borderTop={'2px dotted var(--disabled)'} py={5}>
          <Button 
            component={Link} 
            href={'/reviews'} 
            tone='action' 
            variant='contained'
          >
            Go to reviews
          </Button>
        </Box>
      </Stack>
      
    </GenericGridPageLayout>
  )
}

export default Page;