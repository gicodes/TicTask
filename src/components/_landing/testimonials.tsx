'use client'

import { useState } from "react";
import { Box, Typography } from "@mui/material";

const voices = [
  {
    quote: "I stopped explaining the tool in standups. The board is the standup.",
    who: "Product lead",
    where: "Seed-stage team",
  },
  {
    quote: "They invited me in on a free account. I still have my own workspace.",
    who: "Freelancer",
    where: "Joined as member",
  },
  {
    quote: "Invoice as a ticket type is the first time billing felt like a walk in the park.",
    who: "Solo-preneur",
    where: "Standard plan",
  },
];

export const Voices = () => {
  const [activeQuote, setActiveQuote] = useState<number | null>(null);

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: 1240,
        mx: "auto",
        px: { xs: 2.5, md: 4 },
        py: { xs: 10, md: 16 },
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          mb: { xs: 6, md: 8 },
          opacity: 0.4,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        From the workspace
      </Typography>

      <Box sx={{ display: "grid", gap: { xs: 8, md: 12 } }}>
        {voices.map((item, i) => {
          const isActive = activeQuote === i;
          const words = item.quote.split(" ");

          return (
            <Box
              key={item.who}
              onMouseEnter={() => setActiveQuote(i)}
              onMouseLeave={() => setActiveQuote(null)}
              onFocus={() => setActiveQuote(i)}
              onBlur={() => setActiveQuote(null)}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: i % 2 ? "0.34fr 0.66fr" : "0.66fr 0.34fr",
                },
                gap: 3,
                alignItems: "end",
                position: "relative",
                isolation: "isolate",
                py: { xs: 2, md: 3 },
                px: { xs: 1.5, md: 2 },
                mx: { xs: -1.5, md: -2 },
                borderRadius: "14px",
                transition: "background-color 280ms ease, transform 280ms ease",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: { xs: 0, md: i % 2 ? "auto" : 16 },
                  right: { xs: "auto", md: i % 2 ? 16 : "auto" },
                  width: 34,
                  height: "2px",
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  opacity: 0.45,
                  transform: "scaleX(0.55)",
                  transformOrigin: "left",
                  transition:
                    "transform 300ms ease, opacity 300ms ease",
                  zIndex: -1,
                },

                "@media (hover: hover)": {
                  "&:hover": {
                    backgroundColor: "var(--surface-2)",
                    transform: "translateY(-3px)",
                  },
                  "&:hover::before": {
                    transform: "scaleX(1)",
                    opacity: 1,
                  },
                },

                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                  "&::before": {
                    transition: "none",
                  },
                  "&:hover": {
                    transform: "none",
                  },
                },
              }}
            >
              <Typography
                component="p"
                sx={{
                  order: { md: i % 2 ? 2 : 1 },
                  fontSize: { xs: "1.7rem", md: "2.35rem" },
                  lineHeight: 1.15,
                  letterSpacing: "-0.045em",
                  fontWeight: 400,
                  maxWidth: 720,
                  m: 0,
                }}
              >
                “
                {words.map((word, index) => (
                  <Box
                    component="span"
                    key={`${i}-${index}`}
                    sx={{
                      display: "inline-block",
                      whiteSpace: "pre",
                      mr: "0.27em",
                      "@keyframes wordReveal": {
                        from: {
                          opacity: 0.15,
                          transform: "translateY(6px)",
                        },
                        to: {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      },
                      animation: isActive
                        ? "wordReveal 350ms cubic-bezier(0.16, 1, 0.3, 1) both"
                        : "none",
                      animationDelay: isActive
                        ? `${index * 45}ms`
                        : "0ms",

                      "@media (prefers-reduced-motion: reduce)": {
                        animation: "none",
                      },
                    }}
                  >
                    {word}
                  </Box>
                ))}
                ”
              </Typography>

              <Box sx={{ order: { md: i % 2 ? 1 : 2 } }}>
                <Typography sx={{ letterSpacing: "-0.03em" }}>
                  {item.who}
                </Typography>
                <Typography sx={{ opacity: 0.45, fontSize: 14 }}>
                  {item.where}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
