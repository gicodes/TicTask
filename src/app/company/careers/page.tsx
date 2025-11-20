"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CAREERS } from "@/constants/company";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Button } from "@/assets/buttons";

export default function CareersSection (){
  return (
    <section id="careers">
      <Box py={12} textAlign="center" px={2}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" fontWeight={700} mb={2}>
            Join us in building a calmer future of work
          </Typography>
          <Typography
            variant="body1"
            maxWidth="md"
            mx="auto"
            sx={{ opacity: 0.8 }}
          >
            At TicTask, we believe productivity should feel purposeful, not pressured.
            We&apos;re looking for people who care deeply about craft, empathy, and impact.
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" mt={3}>
          {CAREERS.map((role, i) => (
            <Grid key={role.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  borderRadius: "16px",
                  border: "1px solid var(--dull-gray)",
                  padding: "2rem",
                  width: 320,
                  textAlign: "left",
                }}
              >
                <Stack spacing={1} mb={2}>
                  <Typography variant="h6" fontWeight={600}>
                    {role.title}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    {role.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.85, minHeight: 70 }}
                  >
                    {role.desc}
                  </Typography>
                </Stack>
                <Button component={Link} href={'/company/careers/join'} fullWidth>
                  Apply Now
                </Button>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Typography variant="body2" sx={{ mt: 6, opacity: 0.7 }}>
          Don&apos;t see a role that fits?{" "}
          <strong>We&apos;re always open to great people — reach out anytime.</strong>
        </Typography>
      </Box>
    </section>
  );
};
