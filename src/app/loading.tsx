import { Box, CircularProgress, Typography } from '@mui/material';

function Loading() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <CircularProgress size={32} thickness={4} />
      <Typography variant="body2" color="var(--secondary)">
        Loading TicTask
      </Typography>
    </Box>
  );
}

export default Loading