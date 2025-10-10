import { Suspense } from "react";
import { Box } from "@mui/material";
import { AuthVerifyPage } from "./ui";

export default function Page() {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <AuthVerifyPage />
    </Suspense>
  )
}