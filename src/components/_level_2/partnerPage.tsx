"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "@/app/page.module.css";
import { BENEFITS } from "@/constants/partner";
import { Box, Stack, Typography, Grid, Divider } from "@mui/material";

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
          <button className={styles.btnPrimary}>
            <Link href={'/company/partner/register'}>Join Partner Program</Link>
          </button>
          <button className={styles.btnSecondary}>
            <Link href={'/resources/docs'}>View Docs</Link>
          </button>
        </Stack>
      </Box>
    </section>
  );
};

export const PartnerBenefits = () => {
  return (
    <section>
      <Box 
        py={10} 
        textAlign="center"
        color={'var(--background)'}
        bgcolor={'var(--foreground)'}
      >
        <Typography variant="h4" fontWeight={700}> Why Partner with Us</Typography>
        <Typography my={2} sx={{ opacity: 0.8 }}> A partnership built to serve high-value products</Typography>
        <Divider sx={{ background: 'var(--dull-gray)', maxWidth: 250, mx: 'auto'}} />
        <Grid
          container
          spacing={4}
          mt={8}
          justifyContent="center"
          sx={{ maxWidth: "lg", mx: "auto" }}
          px={1}
        >
          { BENEFITS.map((b, i) => (
            <Grid key={b.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  padding: "1.5rem",
                  borderRadius: "12px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
                  height: "100%",
                }}
              >
                <Stack spacing={1} alignItems="center" maxWidth={360}>
                  <Typography variant="h6" fontWeight={600}> {b.title} </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.65 }}> {b.desc} </Typography>
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
          <Typography variant="body1" sx={{ opacity: 0.85, pb: 2 }}>
            Join the TicTask Partner Program today and unlock access to tools, insights, and shared growth.
          </Typography>
          <Link href={'/company/partner/register'}>
            <button className={styles.btnPrimary}>Become a Partner</button>
          </Link>
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
