import Link from 'next/link';
import { Box, Typography, Stack } from '@mui/material';
import { Button } from '@/assets/buttons';
import { ArrowRight } from 'lucide-react';

function NotFound() {
  return (
    <Box
      component="main"
      minHeight="75vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={3}
      textAlign="center"
    >
      <Stack spacing={3} maxWidth={600}>
        <Typography variant="overline" color="var(--secondary)" letterSpacing={2}>
          404
        </Typography>
        <Typography variant="h3" fontWeight={700}>
          This page does not exist
        </Typography>
        <Typography color="var(--secondary)">
          The link may be outdated or the page may have moved. You can return home or continue from a public section.
        </Typography>
        <Box py={3}>
          <Button tone='retreat' component={Link} href="/">
            Back to home
          </Button>
        </Box>
          
        <Stack 
          direction={{ xs: 'column', sm: 'row' }}  
          justifyContent="center"
          spacing={1.5}
        >
          <Button 
            component={Link} href="/product" variant="outlined">
            Explore product
          </Button>
          <Button 
            tone='secondary' 
            component={Link} 
            href="/resources" 
            variant="contained"
            endIcon={<ArrowRight />}
          >
            Resources
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NotFound