'use client';

import { useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Button } from '@/assets/buttons';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <Stack spacing={3} maxWidth={480} alignItems="center">
        <AlertCircle size={40} />
        <Typography variant="h4" fontWeight={700}>
          Something went wrong
        </Typography>
        <Typography color="text.secondary">
          An unexpected error occurred. You can try again or return to the dashboard.
        </Typography>
        {error.digest && (
          <Typography variant="caption" color="text.secondary">
            Reference: {error.digest}
          </Typography>
        )}
        <Stack direction="row" spacing={1.5}>
          <Button onClick={() => reset()}>Try again</Button>
          <Button component={Link} href="/" variant="outlined">
            Go home
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}