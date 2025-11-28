'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Box, Alert, Typography } from "@mui/material";
import { GrRedo, GrToast } from "react-icons/gr";
import { useEffect, useState } from "react";
import { Button } from "@/assets/buttons";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

export const ResponsePage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const qc = useQueryClient();
  const [message, setMessage] = useState("");

  const session_id = params.get("session_id");
  const status: string | null = params.get("status"); 

  useEffect(() => {
    if (!session_id) {
      setMessage("Missing or invalid session id");
      return;
    }

    if (status === "success") {
      setMessage("Payment Successful. Finalizing...");

      qc.invalidateQueries({ queryKey: ["subscription"] });

      const poll = async (tries = 6) => {
        for (let i = 0; i < tries; i++) {
          await new Promise((r) => setTimeout(r, 2000));
          await qc.invalidateQueries({ queryKey: ["subscription"] });
        }
      };
      poll().finally(() => {
        setTimeout(() => router.push("/dashboard/subscription"), 2000);
      });
    } else if (status === "failed") {
      setMessage("Payment failed or cancelled. Please retry.");
    }
  }, [session_id, router, status, qc]);

  return (
    <Box
      p={2}
      mt={10}
      mx="auto"
      minWidth={200}
      minHeight="75vh"
      maxWidth={"fit-content"}
    >
      <Alert severity={status === "failed" ? "error" : "success"}>
        {status === "loading" && <Typography>Loading...</Typography>}
        {status === "failed" && <Typography color="tomato">{message} </Typography>}
        {status === "success" && <Typography>{message} <GrToast size={16} /> </Typography>}
      </Alert>

      <Box mt={5}>
        <Button
          component={Link}
          variant="text"
          href={"/product/pricing"}
        >
          {status === "failed" ?
            <>Retry? <GrRedo /> </>
            : <>Cancel and go to pricing?</>
          }
        </Button>
      </Box>
    </Box>
  );
};
