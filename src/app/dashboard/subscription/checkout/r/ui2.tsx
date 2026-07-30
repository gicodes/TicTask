'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Alert, Box, Typography } from "@mui/material";

export default function CheckoutResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const reference = searchParams.get("reference");
  const trxref = searchParams.get("trxref");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const referenceValue = reference || trxref;
    const subscriptionReference = Array.isArray(referenceValue)
      ? referenceValue[0]
      : referenceValue;

    if (status === "success" && subscriptionReference) {
      verifyPayment(subscriptionReference);
    } else {
      setLoading(false);
    }
  }, [status, reference, trxref]);

  const verifyPayment = async (ref: string) => {
    try {
      await axios.post("/api/subscription/verify", { reference: ref });
      router.push("/dashboard?success=subscription");
    } catch (err) {
      console.error(err);
      router.push("/dashboard?error=payment_failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Verifying your payment...</div>;

  return (
    <Box
      p={2}
      mt={10}
      mx="auto"
      minWidth={200}
      minHeight="75vh"
      maxWidth={"fit-content"}
    >
      <Alert severity={status === "success" ? "success" : "error"}>
        {status === "success" ? (
          <Typography>
            Payment Successful! Subscription activated.</Typography>
        ) : (
          <Typography>Payment failed or cancelled.</Typography>
        )}
      </Alert>
    </Box>
  );
}