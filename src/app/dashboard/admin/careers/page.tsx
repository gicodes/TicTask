import { Box, Card, Stack, Typography } from '@mui/material';
import React from 'react'

const page = () => {
  return (
    <Box
      component="section"
      py={12}
      px={2}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 5,
          borderRadius: "16px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography>Careers are unavailable right now. Try again later! </Typography>
        </Stack>
      </Card>
    </Box>
  );
}

export default page