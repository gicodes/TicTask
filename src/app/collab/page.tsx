"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/assets/buttons";
import { Box, Typography, Divider, Card, Stack } from "@mui/material";

export default function ContributorsSection() {
  return (
    <section id="contributors">
      <Box py={14} px={2} textAlign="center" maxWidth="lg" mx="auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" fontWeight={700} mb={2}>
            A Message to Our Future Collaborators
          </Typography>

          <Divider
            sx={{
              background: "var(--dull-gray)",
              maxWidth: 200,
              mx: "auto",
              my: 3,
            }}
          />

          <Typography
            variant="body1"
            maxWidth="md"
            mx="auto"
            sx={{ opacity: 0.9 }}
          >
            TicTask began with a simple idea — that teamwork should feel <em>fluid</em>, not forced.
            We&apos;re building an ecosystem where clarity, creativity, and calm
            coexist. Collaboration isn&apos;t just part of our DNA — it&apos;s the reason we exist.
          </Typography>

          <Typography
            variant="body1"
            maxWidth="md"
            mx="auto"
            mt={3}
            sx={{ opacity: 0.85 }}
          >
            Our <strong>Open Collaboration Program</strong> invites engineers,
            designers, writers, and testers to contribute to TicTask&apos;s
            open-source foundations. Together, we build features, shape ideas,
            and refine systems that help teams work better, everywhere.
          </Typography>

          <Card sx={{ px: 3, py: 5, my: 10, maxWidth: 500, mx: 'auto', borderRadius: 6}}>
            <Box mx="auto" textAlign="left">
              <Typography variant="h6" fontWeight={600} mb={1}>
                📜 Collaboration Guidelines
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75, lineHeight: 2.5 }}>
                • Respect contributors and maintainers.<br />
                • Every contribution — from a typo fix to a core refactor — matters.<br />
                • Follow our contribution workflow and code of conduct.<br />
                • We work in the open: issues, pull requests, and discussions.<br />
                • Credit and transparency are non-negotiable.<br />
              </Typography>

              <Typography variant="h6" fontWeight={600} mt={3} mb={1}>
                📚 Educative Tools
              </Typography>
              <Stack ml={3} mt={2} spacing={1} color={'blueviolet'}>
                <Link href={'/product'}>Product</Link>
                <Link href={'/resources/docs'}>Documentation</Link>
                <Link href={'/resources/docs/dev'}>Technical documentation</Link>
              </Stack>

              <Typography variant="h6" fontWeight={600} mt={5} mb={1}>
                ⚖️ Disclaimer
              </Typography>
              <Typography variant="body2" lineHeight={2}>
                Contributions to TicTask are voluntary and governed by our open-source
                license. Accepted contributors may later become Partners if their
                work extends beyond open-source impact into strategic or business domains.
              </Typography>
            </Box>
          </Card>

          <Button
            component={Link}
            href="/company/partner/register?context=collab"
            tone="action"
          >
            Ready to Collaborate
          </Button>
        </motion.div>
      </Box>
    </section>
  );
}
