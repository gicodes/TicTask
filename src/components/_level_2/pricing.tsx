"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "@/app/page.module.css";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CheckCircle } from "lucide-react";
import { PLANS } from "@/constants/product";

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 }}}>
      <Container maxWidth="xl">
        <Stack spacing={2} alignItems="center" mb={6}>
          <Typography variant="h3" fontWeight={700} textAlign="center">
            Simple, transparent pricing
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ opacity: 0.8, maxWidth: 600 }}>
            Choose a plan that fits your team’s pace. Upgrade anytime as your workflow expands.
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={billing}
            exclusive
            onChange={(_, val) => val && setBilling(val)}
            sx={{
              mt: 3,
              borderRadius: 4,
              bgcolor: "var(--foreground)",
              "& .MuiToggleButton-root": {
                border: "none",
                textTransform: "none",
                px: 3,
              },
            }}
          >
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">Yearly (Save 20%)</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Grid container spacing={4} justifyContent="center">
          {PLANS.map((plan, i) => (
            <Grid key={plan.name}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Box
                  sx={{
                    border: '0.1px solid var(--secondary)',
                    bgcolor: plan.highlight ? "var(--background)" : "transparent",
                    color: plan.highlight ? "var(--foreground)" : "inherit",
                    borderRadius: 4,
                    p: 4,
                    height: "100%",
                    boxShadow: plan.highlight
                      ? "0 8px 32px rgba(0,0,0,0.15)"
                      : "0 1px 4px rgba(0,0,0,0.1)",
                    transform: plan.highlight ? "scale(1.05)" : "none",
                    transition: "all 0.3s ease",
                    "&:hover": plan.highlight
                      ? { boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }
                      : { boxShadow: "0 2px 10px rgba(0,0,0,0.15)" },
                  }}
                >
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700}>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.75 }}>
                      {plan.desc}
                    </Typography>
                    <Divider sx={{ my: 1, opacity: 0.2 }} />

                    <Typography variant="h3" fontWeight={800}>
                      {plan.priceMonthly === 0
                        ? "Free"
                        : billing === "monthly"
                        ? `$${plan.priceMonthly}`
                        : `$${plan.priceYearly}`}
                      {plan.priceMonthly > 0 && (
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ opacity: 0.6, ml: 0.5 }}
                        >
                          /{billing === "monthly" ? "mo" : "yr"}
                        </Typography>
                      )}
                    </Typography>

                    <List dense>
                      {plan.features.map((feat) => (
                        <ListItem key={feat} disablePadding sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 28 }}>
                            <CheckCircle size={16} />
                          </ListItemIcon>
                          <ListItemText primary={feat} />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      variant={plan.highlight ? "contained" : "outlined"}
                      fullWidth
                      sx={{
                        textTransform: "none",
                        mt: 2,
                      }}
                      className={styles.btnPrimary}
                    >
                      {plan.buttonLabel}
                    </Button>
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
