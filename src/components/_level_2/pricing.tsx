"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  Chip,
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
import { Button } from "@/assets/buttons";
import { PLAN_IDS } from "@/lib/pricing";
import { useAuth } from "@/providers/auth";
import { CheckCircle } from "lucide-react";
import { PLANS } from "@/constants/product";
import { useRouter } from "next/navigation";
import { useAlert } from "@/providers/alert";
import { useSubscription } from "@/providers/subscription";

export default function PricingSection() {
  const router = useRouter();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const { subscription, upgradeToCheckout, interval } = useSubscription();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const isBusiness = user?.userType === "BUSINESS";

  const plans = isBusiness
    ? PLANS.filter((p) => ["Standard", "Pro", "Enterprise"].includes(p.name)) : PLANS;
    
  const activePlan = subscription?.plan?.toLowerCase();

  const getButtonLabel = (plan: string) => {
    if (!user) return "Continue";

    if (activePlan === plan.toLowerCase()) {
      if (interval === "monthly" && billing === "yearly")
        return "Switch to Annual";
      return "Extend Subscription";
    }
    return "Select Plan";
  };

  const handleCheckout = async (plan: string) => {
    if (!user) {
      showAlert("Please login to continue", "warning");
      router.push("/auth/login?returnUrl=/product/pricing");
      return;
    }

    const planKey = plan.toLowerCase() as keyof typeof PLAN_IDS;
    const planId = PLAN_IDS[planKey][billing];
    const { url } = await upgradeToCheckout(planId);
    router.push(url);
  };

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 16 } }}>
      <Container maxWidth="xl">
        <Stack spacing={2} alignItems="center" mb={6}>
          <Typography variant="h3" fontWeight={700} textAlign="center">
            Simple, transparent pricing
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ opacity: 0.8, maxWidth: 600 }}>
            Choose a plan that fits your team&nbsp;s pace. Upgrade anytime as your workflow expands.
          </Typography>

          <ToggleButtonGroup
            value={billing}
            exclusive
            onChange={(_, val) => val && setBilling(val)}
            sx={{
              mt: 3,
              "& .MuiToggleButton-root": {
                border: "none",
                textTransform: "none",
                px: 3,
                minWidth: 170,
              },
            }}
          >
            <Card sx={{ borderRadius: 99, minHeight: 50, display: "flex" }}>
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="yearly">
                Yearly <span className="font-xxs">&nbsp;(Save 20%)</span>
              </ToggleButton>
            </Card>
          </ToggleButtonGroup>
        </Stack>

        <Grid container spacing={{ xs: 10, sm: isBusiness ? 10 : 5}} justifyContent="center">
          {plans.map((plan, i) => (
            <Grid key={plan.name}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Box
                  sx={{
                    border: "0.1px solid var(--secondary)",
                    bgcolor: plan.highlight ? "var(--background)" : "transparent",
                    borderRadius: 4,
                    p: 4,
                    height: "100%",
                    boxShadow: plan.highlight
                      ? "0 8px 32px rgba(0,0,0,0.15)"
                      : "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                      <Typography variant="h6" fontWeight={700}>
                        {plan.name}
                      </Typography>
                      { activePlan===plan.plan.toLowerCase() && 
                        <Chip
                          label='Current Plan'
                          size="small"
                          sx={{ fontSize: '0.65rem', px: 0.5, height: 20 }}
                          />
                        }
                    </Stack>

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
                          <ListItemIcon sx={{ minWidth: 28 }}> <CheckCircle size={16} /> </ListItemIcon>
                          <ListItemText primary={feat} />
                        </ListItem>
                      ))}
                    </List>

                    <Button onClick={() => handleCheckout(plan.name)}>
                      {getButtonLabel(plan.plan)}
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
