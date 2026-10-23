import Link from 'next/link';
import { Box, Typography, Stack } from '@mui/material';
import { Button } from '@/assets/buttons';

function NotFound() {
  return (
    <Box
      component="main"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={3}
      textAlign="center"
    >
      <Stack spacing={3} maxWidth={480}>
        <Typography variant="overline" color="text.secondary" letterSpacing={2}>
          404
        </Typography>
        <Typography variant="h3" fontWeight={700}>
          This page does not exist
        </Typography>
        <Typography color="text.secondary">
          The link may be outdated or the page may have moved. You can return home or continue from a public section.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
          <Button tone='retreat' component={Link} href="/">
            Back to home
          </Button>
          <br /><br/>
          <Button component={Link} href="/product" variant="outlined">
            Explore product
          </Button>
          <Button tone='secondary' component={Link} href="/resources" variant="contained">
            Resources
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NotFound