'use client';

import { apiPost } from "@/lib/api"; 
import { ChevronLeft } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Box, Button, Toolbar, Typography } from "@mui/material";
import { ConfirmVerificationRequest, ConfirmVerificationResponse } from "@/types/axios";

export const VerifyPage = () => {
  const router = useRouter();
  const hasRun = useRef(false);
  const params = useSearchParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const token = params.get("token");
  const email = params.get("email");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing or invalid token");

      return;
    }

    const verify = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      try {
        const res = await apiPost<ConfirmVerificationResponse, ConfirmVerificationRequest>(
          "/auth/confirm-verification",
          { token }
        );

        setStatus("success");
        setMessage(res.message);

        setTimeout(() => {
          if (res.role === "ADMIN") {
            router.push("/auth/login/admin");
          } else if (res.role === "USER") {
            router.push(
              "/onboarding?role=USER" +
                "&token=" + encodeURI(res.token || token)
            );
          }
        }, 2000);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "message" in err) {
          const message = (err as { message?: string }).message;
          
          if (message === "Email already registered") {
            console.warn("Email already verified or exists, redirecting to onboarding...");
            setMessage("Email already verified or exists, redirecting to onboarding...");
            router.push("/onboarding?email=" + encodeURIComponent(email || "") + "&token=" + encodeURIComponent(token));
            return;
          }
          setMessage(message ?? "Verification failed");
        } else {
          setMessage("Verification failed");
        }
        setStatus("error");
      }
    };

    verify();
  }, [token, email, router]);

  return (
    <Box 
      minHeight="75vh" 
      mt={10} p={2}
      mx="auto" 
      minWidth={200} 
      maxWidth={'fit-content'}
    >
      <Alert severity={status==="error" ? 'error' : status==="success" ? 'success' : 'info'}>
        {status === "loading" && <Typography>Verifying your email...</Typography>}
        {status === "success" && <Typography>{message} Redirecting...</Typography>}
        {status === "error" && <Typography className="text-red-500">{message}</Typography>}
      </Alert>
      <Toolbar />
      { status==="error" &&
        <Button variant="text" href="/"> 
          <ChevronLeft/>&nbsp; 
          Go Home
        </Button>
      }
    </Box>
  );
}
