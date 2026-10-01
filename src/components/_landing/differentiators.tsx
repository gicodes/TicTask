import { Box, Typography } from "@mui/material";

const contrasts = [
  { not: "Another project manager.", is: "A ticket that already knows how to move." },
  { not: "A suite of modules.", is: "Board, list, planner, calendar — same objects." },
  { not: "Everyone pays to participate.", is: "Members can be free. Owners carry the plan." },
  { not: "AI as a sidebar gimmick.", is: "Draft in the ticket. Automate only when you unlock it." },
  { not: "Community behind the gate.", is: "Blogs, resources, and build-with-us stay open." },
];

export const Differentiators = () => (
  <Box
    component="section"
    sx={{
      width: "100%",
      position: "relative",
      overflow: "hidden",
      py: { xs: 10, md: 18 },
    }}
  >
    <Box
      sx={{
        position: "absolute",
        inset: "10% 20% auto 10%",
        height: 420,
        background:
          "radial-gradient(closest-side, color-mix(in srgb, var(--flair) 16%, transparent), transparent 70%)",
        pointerEvents: "none",
      }}
    />

      <Box sx={{ maxWidth: 860 }}>
        {contrasts.map((row) => (
          <Box
            key={row.is}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 0.75, md: 6 },
              py: { xs: 2.25, md: 2.75 },
              borderTop: "1px solid color-mix(in srgb, currentColor 10%, transparent)",
            }}
          >
            <Typography sx={{ opacity: 0.38, textDecoration: "line-through", textDecorationThickness: 1 }}>
              {row.not}
            </Typography>
            <Typography sx={{ fontSize: { xs: 18, md: 22 }, letterSpacing: "-0.03em" }}>
              {row.is}
            </Typography>
          </Box>
        ))}
    </Box>
  </Box>
);