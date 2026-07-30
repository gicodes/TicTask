'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Box, Alert, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@/assets/buttons";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/lib/axios";

export const ResponsePage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const qc = useQueryClient();

  const status = params.get("status"); // success | failed
  const reference = params.get("reference") || params.get("trxref");

  const [message, setMessage] = useState("Processing your payment...");
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (status !== "success" || !reference) {
      setMessage(status === "failed" 
        ? "Payment was cancelled or failed." 
        : "Invalid payment response.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        await apiPost("/subscription/verify", { reference });
        await qc.invalidateQueries({ queryKey: ["subscription"] });
        setMessage("Payment successful! Your subscription is now active.");
        setVerified(true);
      } catch (err) {
        setMessage("Payment received but verification is taking longer than expected. Please refresh your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [status, reference, qc]);

  return (
    <Box p={4} mt={12} mx="auto" maxWidth={500} textAlign="center" bgcolor={'white'}>
      {loading ? (
        <Box>
          <CircularProgress size={40} />
          <Typography mt={3}>{message}</Typography>
        </Box>
      ) : (
        <Alert severity={status === "success" && verified ? "success" : "error"} sx={{ alignItems: 'center' }}>
          <Typography>{message}</Typography>
        </Alert>
      )}

      <Box mt={5} display="flex" gap={2} justifyContent="center">
        <Button component={Link} href="/dashboard/subscription" variant="contained">
          Go to Subscription
        </Button>
        {status === "failed" && (
          <Button component={Link} href="/product/pricing" variant="outlined">
            Try Again
          </Button>
        )}
      </Box>
    </Box>
  );
};