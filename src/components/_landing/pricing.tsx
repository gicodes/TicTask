"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Button } from "@/assets/buttons";

const preview = [
  {
    name: "Personal",
    price: "Free",
    desc: "One workspace. Tickets, board, calendar, limited AI.",
    note: "Join teams by invite",
  },
  {
    name: "Standard",
    price: "$12",
    period: "/mo",
    desc: "Team workspace, invoice linking, metrics, push.",
    note: "1 team · 6 members",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$36",
    period: "/mo",
    desc: "Advanced AI, automation, integrations, export.",
    note: "3 teams · 6 each",
  },
];

const PricingTeaser = () => {
  const router = useRouter();

  return (
    <Box
      component="section"
      sx={{ width: "100%", maxWidth: 1180, mx: "auto", p: { xs: 2, md: 4 } }}
    >
      <Chip
        sx={{
          border: '1px solid var(--flair)',
          textTransform: "uppercase",
          color: 'gray',
          fontWeight: 600,
          width: 'max-content',
          p: 1,
        }}
        label="Plans & Pricing"
      />
        
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
          mt: 5,
        }}
      >
        {preview.map((plan) => (
          <Box
            key={plan.name}
            sx={{
              p: 3,
              borderRadius: 3,
              border: plan.highlight
                ? "1px solid var(--flair)"
                : "1px solid color-mix(in srgb, currentColor 10%, transparent)",
              bgcolor: plan.highlight
                ? "color-mix(in srgb, var(--flair) 6%, transparent)"
                : "transparent",
            }}
          >
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography fontWeight={700}>{plan.name}</Typography>
              {plan.highlight && (
                <Chip
                  size="small"
                  label="Most teams"
                  sx={{ color: "var(--flair)", border: "1px solid var(--flair)" }}
                />
              )}
            </Stack>
            <Typography
              sx={{
                fontSize: "2.4rem",
                fontWeight: 500,
                letterSpacing: "-0.05em",
              }}
            >
              {plan.price}
              <Box
                component="span"
                sx={{ fontSize: 14, color: "var(--disabled)", ml: 0.5 }}
              >
                {plan.period}
              </Box>
            </Typography>
            <Typography sx={{ mt: 1.5, mb: 2 }}>
              {plan.desc}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: 0.75,
                mb: 3,
              }}
            >
              {plan.note}
            </Typography>
            <Button onClick={() => router.push("/product/pricing")}>
              View plans
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PricingTeaser;