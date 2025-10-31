"use client";
import { Box, CircularProgress, Container } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    </Container>
  );
}
