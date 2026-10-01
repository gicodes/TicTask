import { Box, Typography } from "@mui/material";

export const Ecosystem = () => (
  <Box
    component="section"
    sx={{
      width: "100%",
      maxWidth: 1240,
      mx: "auto",
      p: { xs: 2, md: 4 },
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
          lineHeight: 1,
          fontWeight: 450,
          maxWidth: 669,
        }}
      >
        Lives in your stack.
        <Box component="span" sx={{ display: "block", opacity: 0.45 }}>
          And can stand on its own.
        </Box>
      </Typography>

      <Typography 
        sx={{ 
          mt: 3, mb: { xs: 6, md: 8 }, 
          maxWidth: 500, opacity: 0.65, 
          lineHeight: 1.6 
        }}
      >
        Simple UIX, Responsive layouts + Notifications that are native. 
        Slack, GitHub and Drive integrations arrive with Enterprise.<br/> 
        Personal workspace & Community never require a plan.
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

const layers = [
  { 
    name: "Native (Freemium)", 
    items: ["Tickets", "Personal workspace", "Email", "In-app", "Board / List", "Calendar",] 
  },
  { 
    name: "Open surface", 
    items: ["Community", "Resources", "Templates", "Build with us"] 
  },
  {
    name: "Organization Account",
    items: ["Billing", "Team Owner", "Workflow", "Enterprise"]
  },
  { 
    name: "Paid plan (Standard)", 
    items: ["AI assistance", "Push", "Invoice"] 
  },
  { 
    name: "Unlocks on Pro", 
    items: ["Export", "Integrations", "Ticket / team limits", "Priority"] 
  },
  { 
    name: "Enterprise", 
    items: ["Custom workflow", "Automation","SSO",  "Roles & permissions", "Timeline & Gantt",] 
  },
];