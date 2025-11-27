'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { Box, Alert, Typography } from "@mui/material";
import { GrRedo, GrToast } from "react-icons/gr";
import { Button } from "@/assets/buttons";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ResponsePage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [message, setMessage] = useState("");

  const session_id = params.get("session_id");
  const status: string | null = params.get("status") // status expected would be "success" | "failed"

  useEffect(() => {

    if (!session_id) {
      setMessage("Missing or invalid session id");
      return;
    }

    if (status==='success') {
      setMessage("Payment Successful. Redirecting...")
      setTimeout(() => router.push('/dashboard/subscription'), 10000);
    }
  }, [session_id, router, status]);
    
  return (
    <Box 
      mx="auto" 
      mt={10} p={2}
      minWidth={200}
      minHeight="75vh"  
      maxWidth={'fit-content'}
    >
      <Alert severity={"success"}>
        {status === "loading" && <Typography>Loading...</Typography>}
        {status === "failed" && <Typography color="tomato">{message} </Typography>}
        {status === "success" && <Typography>{message} <GrToast size={16} /> </Typography>}
      </Alert>

      <Box mt={5}>
        <Button 
          component={Link} 
          variant="text" 
          href={'/product/pricing'}
        >
          {status === "failed" ? 
            <>Retry? <GrRedo /> </>
          : <>Cancel and go to pricing?</>
        }
        </Button>
      </Box>
    </Box>
  );
}
