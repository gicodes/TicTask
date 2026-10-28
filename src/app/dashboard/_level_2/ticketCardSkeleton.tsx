import { Box, Skeleton, Stack } from '@mui/material';

export function TicketCardSkeleton() {
  return (
    <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
      <Skeleton variant="text" width="70%" height={24} />
      <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: 1 }} />
      </Stack>
    </Box>
  );
}

export function ColumnSkeleton() {
  return (
    <Box px={1} mr={1} mt={{ sm: 2 }} maxWidth={360} minWidth={{ xs: 300, sm: 234 }}>
      <Skeleton variant="text" width="50%" height={32} sx={{ mb: 2 }} />
      <Stack spacing={2}>
        {[1, 2, 3].map((i) => <TicketCardSkeleton key={i} />)}
      </Stack>
    </Box>
  );
}