import { Box } from "@mui/material";
import { Suspense } from "react";
import VerifyInvite from "./ui";

export default function Page() {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <VerifyInvite />
    </Suspense>
  )
}