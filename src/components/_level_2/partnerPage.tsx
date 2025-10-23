"use client";

import { Box, Stack, Typography, Grid } from "@mui/material";
import styles from "@/app/page.module.css";
import { motion } from "framer-motion";
import { BENEFITS } from "@/constants/partners";

export const PartnerHero = () => {
  return (
    <section>
      <Box
        py={12}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={2}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          Partner with TicTask
        </motion.h1>
        <Typography variant="h6" sx={{ opacity: 0.85, maxWidth: "md" }}>
          Build, integrate, and grow with TicTask.  
          Access tools, APIs, and co-marketing opportunities to scale together.
        </Typography>

        <Stack mt={4} direction="row" spacing={2}>
          <button className={styles.btnPrimary}>Join Partner Program</button>
          <button className={styles.btnSecondary}>View Docs</button>
        </Stack>
      </Box>
    </section>
  );
};

export const PartnerBenefits = () => {

  return (
    <section>
      <Box py={10} textAlign="center">
        <Typography variant="h4" fontWeight={700} mb={2}>
          Why Partner with Us
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.85, mb: 8 }}>
          A partnership built to help you deliver more value to your users.
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: "lg", mx: "auto" }}
        >
          {BENEFITS.map((b, i) => (
            <Grid key={b.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  height: "100%",
                }}
              >
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h6" fontWeight={600}>
                    {b.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>
                    {b.desc}
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export const PartnerCTA = () => {
  return (
    <section>
      <Box
        py={12}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={2}
      >
        <Stack spacing={3} alignItems="center" maxWidth="sm">
          <Typography variant="h4" fontWeight={700}>
            Ready to collaborate with us?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            Join the TicTask Partner Program today and unlock access to tools, insights, and shared growth.
          </Typography>
          <button className={styles.btnPrimary}>Become a Partner</button>
        </Stack>
      </Box>
    </section>
  );
};

export default function PartnerSection() {
  return (
    <main>
      <PartnerHero />
      <PartnerBenefits />
      <PartnerCTA />
    </main>
  );
}
