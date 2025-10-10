import { Box } from "@mui/material";
import Onboard from "./onboarding";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <Onboard />
    </Suspense>
  )
}