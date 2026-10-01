import { Box, Typography } from "@mui/material";

const layers = [
  { name: "Native", items: ["Email", "In-app", "Calendar", "Board / List"] },
  { name: "Unlocks on Pro", items: ["Slack", "GitHub", "Drive", "Push"] },
  { name: "Open surface", items: ["Community", "Resources", "Templates", "Build with us"] },
];

export const Ecosystem = () => (
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
    <Box
      sx={{
        borderRadius: 6,
        px: { xs: 2.5, md: 6 },
        py: { xs: 6, md: 9 },
        background:
          "linear-gradient(180deg, color-mix(in srgb, currentColor 5%, transparent), transparent 40%)",
        outline: "1px solid color-mix(in srgb, currentColor 8%, transparent)",
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: "2.6rem", md: "4.2rem" },
          letterSpacing: "-0.07em",
          lineHeight: 0.92,
          fontWeight: 450,
          maxWidth: 640,
        }}
      >
        Lives in your stack.
        <Box component="span" sx={{ display: "block", opacity: 0.45 }}>
          Does not become your stack.
        </Box>
      </Typography>

      <Typography sx={{ mt: 3, mb: { xs: 6, md: 8 }, maxWidth: 460, opacity: 0.65, lineHeight: 1.6 }}>
        Notifications and views are native. Slack, GitHub and Drive arrive with Pro.
        Community never waits on a plan.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 5, md: 6 },
        }}
      >
        {layers.map((layer) => (
          <Box key={layer.name}>
            <Typography
              sx={{
                mb: 2.5,
                fontSize: 12,
                opacity: 0.4,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              {layer.name}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {layer.items.map((item) => (
                <Box
                  key={item}
                  sx={{
                    px: 1.75,
                    py: 1.1,
                    borderRadius: 10,
                    fontSize: 14,
                    letterSpacing: "-0.02em",
                    bgcolor: "color-mix(in srgb, currentColor 6%, transparent)",
                  }}
                >
                  {item}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);