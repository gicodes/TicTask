'use client'

import { Button } from "@/assets/buttons";
import { Typography, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

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
          Work that flows. <br /> Teams that don&apos;t fight their tools.
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