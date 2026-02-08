"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/assets/buttons";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { FEATURES } from "@/constants/product";
import { Box, Typography, Grid, Stack, Divider } from "@mui/material";

export const ProductHero = () => {
  return (
    <section>
      <Box
        textAlign="center"
        maxWidth="xl"
        mx="auto"
        py={18}
        px={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            fontSize: "2.9rem",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "1.5rem",
          }}
        >
          Work that flows. <br />
          Teams that don&apos;t fight their tools.
        </motion.h1>

        <Typography
          variant="h6"
          textAlign="center"
          maxWidth="md"
          sx={{ opacity: 0.85 }}
        >
          TicTask brings clarity, momentum, and structure into one calm workspace —
          from personal focus to enterprise-scale execution.
        </Typography>

        <Typography
          variant="body2"
          maxWidth="sm"
          mt={2}
          sx={{ opacity: 0.65 }}
        >
          Designed for people who value progress over noise.
          Built to grow as your workflow grows.
        </Typography>

        {/* Soft CTA */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mt={5}
        >
          <Button component={Link} href="/product/pricing">
            View Plans
          </Button>
          <Button
            tone="secondary"
            component={Link}
            href="/auth/join/user"
          >
            Start Free
          </Button>
        </Stack>
      </Box>
    </section>
  );
};

export const ProductShowcase = () => {
  return (
    <section>
      <Box
        py={14}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        color={"var(--background)"}
        bgcolor={"var(--foreground)"}
        px={1.5}
      >
        {/* Section intro */}
        <Typography variant="h4" fontWeight={800}>
          One system. Every stage of work.
        </Typography>

        <Typography
          variant="body1"
          my={2}
          maxWidth="md"
          sx={{ opacity: 0.9 }}
        >
          Start with simple tasks. Grow into structured projects.
          Scale into coordinated team execution — without switching tools.
        </Typography>

        <Divider
          sx={{
            background: "var(--dull-gray)",
            width: "100%",
            maxWidth: 220,
            my: 2,
          }}
        />

        <Grid
          mt={6}
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: "lg", mx: "auto" }}
        >
          {FEATURES.map((f, i) => (
            <Grid key={f.title}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                style={{
                  maxWidth: 360,
                  padding: "1.75rem",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                }}
              >
                <Stack spacing={1.5} alignItems="center">
                  <Typography variant="h6" fontWeight={700}>
                    {f.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{ opacity: 0.85 }}
                  >
                    {f.desc}
                  </Typography>

                  {/* Optional plan hint */}
                  {"plan" in f && (
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.6, mt: 0.5 }}
                    >
                      Available on {String(f.plan)}
                    </Typography>
                  )}
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Stack
          spacing={4}
          mt={10}
          maxWidth="md"
          textAlign="center"
        >
          <Typography variant="h5" fontWeight={700}>
            Choose how deep you want to go
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.85 }}>
            TicTask adapts to how serious your workflow becomes —
            no forced upgrades, no bloated complexity.
          </Typography>

          <Grid container spacing={4}>
            <Grid>
              <Typography fontWeight={700} gutterBottom>
                Pro
              </Typography>
              <Typography variant="body2">
                Designed for teams that rely on timing and accountability.
                Get push notifications, reminders, advanced roles,
                deeper analytics, and smarter AI assistance.
              </Typography>
            </Grid>

            <Grid>
              <Typography fontWeight={700} gutterBottom>
                Enterprise
              </Typography>
              <Typography variant="body2">
                Built for organizations running parallel teams.
                Unlock multiple workspaces, timeline & Gantt views,
                workflow automation, integrations, and compliance-level control.
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </section>
  );
};

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
    <section>
      <Box
        py={14}
        gap={6}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* Pricing CTA */}
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
          }}
        />

        {/* Action CTA */}
        <Stack spacing={3} alignItems="center" maxWidth="sm">
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


export default function ProductsSection() {
  return (
    <main>
      <ProductHero />
      <ProductShowcase />
      <ProductCTA />
    </main>
  );
}
