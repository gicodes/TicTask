'use client';

import Link from "next/link";
import { apiPost } from "@/lib/axios"; 
import { Button } from "@/assets/buttons";
import { ArrowBack } from "@mui/icons-material";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Box, Toolbar, Typography } from "@mui/material";
import { ConfirmVerificationRequest, ConfirmVerificationResponse } from "@/types/axios";
import { useAuth } from "@/providers/auth";

const VerifyPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const hasRun = useRef(false);
  const params = useSearchParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const token = params.get("token");
  const teamId = params.get("teamId");

  useEffect(() => {
    if (!user) {
      setStatus("error");
      setMessage("User not authenticated. Please log in to accept the invite.");

      return;
    };

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
          "/team/accept-invite", { token, userId: user.id }
        );

        setStatus("success");
        setMessage(res.message);

        setTimeout(() => {
          router.push(
            "/dashboard/teams/" + teamId + "/members"
          );
        }, 2000);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "message" in err) {
          const message = (err as { message?: string }).message;

          setMessage(message ?? "Verification failed");
        } else {
          setMessage("Verification failed");
        }

        setStatus("error");
      }
    };

    verify();
  }, [token, user, teamId, router]);

  return (
    <Box 
      p={2}
      mt={10}
      mx="auto" 
      minWidth={200} 
      minHeight="75vh" 
      maxWidth={'fit-content'}
    >
      <Alert severity={status==="error" ? 'error' : status==="success" ? 'success' : 'info'}>
        {status === "loading" && <Typography>Verifying your invite...</Typography>}
        {status === "success" && <Typography>{message} Redirecting...</Typography>}
        {status === "error" && <Typography className="text-red-500">{message}</Typography>}
      </Alert>

      <Toolbar />

      { status==="error" &&
        <Button component={Link} href="/" startIcon={<ArrowBack/>}> 
          Go Home
        </Button>
      }
    </Box>
  );
}

export default VerifyPage;
