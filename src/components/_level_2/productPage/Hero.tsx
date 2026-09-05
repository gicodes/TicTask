'use client'

import { Typography, Stack, Box } from "@mui/material";
import { motion } from "framer-motion";

export const ProductHero = () => {
  return (
    <section>
      <Box
        textAlign="center"
        maxWidth="xl"
        mx="auto"
        py={15}
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
          Work that flows. <br /> Teams that don&apos;t dread their tools.
        </motion.h1>

        <Typography
          variant="h6"
          textAlign="center"
          maxWidth="md"
          sx={{ opacity: 0.85 }}
        >
          Bringing clarity, momentum, and structure into one calm workspace—
          from personal focus to enterprise scale execution.
        </Typography>
      </Box>
    </section>
  );
};