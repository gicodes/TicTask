'use client';

import { Box, Skeleton, Grid } from '@mui/material';

export default function WorkspaceSkeleton() {
  return (
    <Box p={3}>
      <Grid container spacing={2} mb={3}>
        {[1,2,3,4].map((i) => (
          <Grid key={i}>
            <Skeleton
              variant="rounded"
              height={100}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
        ))}
      </Grid>

      <Skeleton
        variant="rounded"
        height={500}
        sx={{ borderRadius: 4 }}
      />
    </Box>
  );
}
