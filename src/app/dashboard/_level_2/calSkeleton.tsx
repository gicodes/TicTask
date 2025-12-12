import { Box, Skeleton } from '@mui/material';

export default function CalendarSkeleton() {
  return (
    <Box px={2} py={2}>
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          height={50}
          width="100%"
          sx={{ my: 1, borderRadius: 1 }}
          animation="wave"
        />
      ))}
    </Box>
  );
}
