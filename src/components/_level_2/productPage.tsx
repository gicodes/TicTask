"use client";

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
        py={15}
        px={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "2.75rem", fontWeight: 700, marginBottom: "1.5rem" }}
        >
          Everything your team needs to move faster.
        </motion.h1>
        <Typography
          variant="h6"
          textAlign="center"
          maxWidth="md"
          sx={{ opacity: 0.85 }}
        >
          TicTask brings tasks, timelines, and teamwork into one seamless flow.
        </Typography>
      </Box>
    </section>
  );
};

export const ProductShowcase = () => {
  return (
    <section>
      <Box
        py={10}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        color={'var(--background)'}
        bgcolor={'var(--foreground)'}
        px={1.5}
      >
        <Typography variant="h4" fontWeight={700}> Everything you need to move faster</Typography>
        <Typography variant="body1" my={2}> TicTask turns thoughts to tasks. Plans to Projects. Deliverables to Done.</Typography>
        <Divider sx={{  background: 'var(--dull-gray)', width: '100%', maxWidth: 200, my: 1}} />
        
        <Grid
          mt={5}
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: "lg", mx: "auto" }}
        >
          {FEATURES.map((f, i) => (
            <Grid key={f.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  maxWidth: 360,
                  padding: "1.5rem",
                  borderRadius: "12px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}
              >
                <Stack spacing={1} alignItems="center">
                  <Typography variant="h6" fontWeight={600}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {f.desc}
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

export const ProductCTA = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();

  const GetStarted = async () => {
    if (!user) {
      showAlert("You must be logged in. Redirecting to login page")
      setTimeout(() => router.push('/auth/login'), 1000);
    }

    if (user && (user.userType==="PERSONAL" || user.userType==="BUSINESS")){ 
      showAlert("Go Pro? Great Choice! Redirecting you to checkout from pricing")
      setTimeout(() => router.push('/product/pricing'), 1200) 
    };
  }

  return (
    <section>
      <Box
        py={12}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Stack spacing={3} alignItems="center" maxWidth="sm">
          <Typography variant="h4" fontWeight={700}>
            Ready to bring your team into flow?
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.65 }}>
            Get started with TicTask and experience a calmer, more focused way to collaborate.
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
