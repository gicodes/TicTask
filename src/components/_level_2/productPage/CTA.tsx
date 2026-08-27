"use client";

import Link from "next/link";
import { Button } from "@/assets/buttons";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { Box, Typography, Stack, Divider } from "@mui/material";

export const ProductCTA = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();

  const GetStarted = async () => {
    if (!user) {
      showAlert("You must be logged in. Redirecting to login page");
      setTimeout(() => router.push("/auth/login"), 1000);
    }

    if (
      user &&
      (user.userType === "PERSONAL" || user.userType === "BUSINESS")
    ) {
      showAlert(
        "Go Pro? Great choice. Redirecting you to pricing & checkout."
      );
      setTimeout(() => router.push("/product/pricing"), 1200);
    }
  };

  return (
    <section id="product-cta">
      <Box
        py={12}
        px={{ xs: 2, md: 6}}
        maxWidth={1200}
        margin={'0 auto'}
        gap={6}
        textAlign="center"
        display="flex"
        justifyContent={'space-between'}
        flexDirection={{xs: "column", md: "row"}}
        alignItems="center"
      >
        <Stack spacing={3} alignItems="center" maxWidth="sm">
          <Typography variant="h4" fontWeight={800}>
            Compare plans. Choose your pace.
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            From personal focus to enterprise orchestration —
            only upgrade when your workflow truly needs it.
          </Typography>
          <Button
            tone="secondary"
            component={Link}
            href={"/product/pricing"}
          >
            Browse Pricing
          </Button>
        </Stack>

        <Divider
          sx={{
            maxWidth: { xs: 240, sm: 380 },
            width: "100%",
            mx: "auto",
            background: 'whitesmoke',
            display: { xs: "block", md: "none" }
          }}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            background: 'whitesmoke',
            display: { xs: "none", md: "block" },
            mx: 4,
            height: 160,
          }}
        />

        <Stack spacing={3} padding={1} alignItems="center" maxWidth="sm">
          <Typography variant="h4" fontWeight={800}>
            Ready to experience work without friction?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7 }}>
            Join teams using TicTask to stay focused, accountable,
            and in control — without chaos, noise, or tool fatigue.
          </Typography>
          <Button onClick={GetStarted}>Get Started</Button>
        </Stack>
      </Box>
    </section>
  );
};
