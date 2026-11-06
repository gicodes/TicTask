'use client';

import Link from 'next/link';
import { useAuth } from '@/providers/auth';
import { Button } from '@/assets/buttons';
import AuthRedirectBtn from '@/assets/authRedirectBtn';
import { Box, Chip, Stack, Typography } from '@mui/material';
import GenericGridPageLayout from '../../_level_1/genGridPageLayout';
import GenericDashboardPagesHeader from '../../_level_1/genDashPagesHeader';

const Page = () => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) return (
    <Box textAlign="center" p={4}>
      Loading Marketing View...
    </Box>
  );

  if (!isAuthenticated) return (
    <Box textAlign="center" px={2} display="grid" gap={10} py={10}>
      <Typography>
        Please <AuthRedirectBtn /> to access dashboard
      </Typography>
    </Box>
  );

  return (
    <GenericGridPageLayout>
      <GenericDashboardPagesHeader 
        title={'Marketing'} 
        description={'Manage Advertisements, PR and Marketing Campaigns under one house'}
      />

      <Box 
        py={5} 
        gap={5} 
        maxWidth={720}
        display={'flex'}
        flexDirection={'column'}
        borderTop={'2px dotted var(--disabled)'} 
      >
        <Typography variant='body2' color={'var(--secondary)'}>
          Note: Marketing features are currently in beta. Some features may be limited or unavailable. We appreciate your understanding and feedback as we continue to improve our marketing tools.
        </Typography>        
        
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

        <Stack 
          gap={2} 
          mt={5} 
          alignItems={'center'}
          direction={{ xs: 'column', sm: 'row' }} 
        >
          <Button 
            component={Link} 
            href={'/reviews'} 
            tone='action' 
            variant='contained'
          >
            Go to reviews
          </Button>

          {isAdmin && (
            <Button 
              component={Link} 
              href={'/dashboard/admin/reviews'} 
              variant='contained'
            >
              Manage reviews
            </Button>
          )}
        </Stack>
      </Box>
    </GenericGridPageLayout>
  )
}

export default Page;