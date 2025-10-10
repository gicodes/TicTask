import { Box } from "@mui/material";
import { VerifyPage } from "./ui";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <VerifyPage />
    </Suspense>
  )
}