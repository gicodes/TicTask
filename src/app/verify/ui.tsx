'use client';

import { apiPost } from "@/lib/api"; 
import { useEffect, useState } from "react";
import { ChevronLeft } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Box, Button, Toolbar, Typography } from "@mui/material";
import { ConfirmVerificationRequest, ConfirmVerificationResponse } from "@/types/axios";

export const VerifyPage = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing or invalid token");
      return;
    }

    const verify = async () => {
      try {
        const res = await apiPost<ConfirmVerificationResponse, ConfirmVerificationRequest>("/auth/confirm-verification", { token });
        setStatus("success");
        setMessage(res.message);

        setTimeout(() => {
          if (res.role === "ADMIN") router.push("/auth/login/admin");
          else if (res.role === "USER") router.push("/auth/onboarding");
        }, 2000);
      } catch (err) {
        setStatus("error");
        if (err && typeof err === "object" && "message" in err) {
          setMessage((err as { message: string }).message);
        } else {
          setMessage("Verification failed");
        }
      }
    };

    verify();
  }, [token, router]);

  return (
    <Box minHeight="75vh" mt={10} mx="auto" minWidth={200} maxWidth={'fit-content'} p={2}>
      <Alert severity={status==="error" ? 'error' : status==="success" ? 'success' : 'info'}>
        {status === "loading" && <Typography>Verifying your email...</Typography>}
        {status === "success" && <Typography>{message} Redirecting...</Typography>}
        {status === "error" && <Typography className="text-red-500">{message}</Typography>}
      </Alert>
      <Toolbar />
      { status==="error" &&
        <Button variant="text" href="/"> <ChevronLeft/>&nbsp; Go Home</Button>
      }
    </Box>
  );
}