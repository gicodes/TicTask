import { Box } from "@mui/material";
import CheckoutResult from "./r/ui2";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Box py={10} textAlign={'center'}>Loading...</Box>}>
      <CheckoutResult />
    </Suspense>
  )
}