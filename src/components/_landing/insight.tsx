import { Box, Stack, Typography } from "@mui/material";

const IndexInsight = () => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        maxWidth: 1180,
        mx: "auto",
        mt: 2,
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 760,
          mb: { xs: 4, md: 6 },
          display: "grid",
          gap: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
          className="action-pulse"
        >
          ☞ GET INTO ACTION
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontSize: {
              xs: "2.4rem",
              sm: "3.2rem",
              md: "4.2rem",
            },
            lineHeight: 0.98,
            letterSpacing: "-0.055em",
            fontWeight: 500,
            maxWidth: 700,
          }}
        >
          Everything you need
          <br />
          <Box component="span" color="var(--disabled)">
            to move work forward.
          </Box>
        </Typography>

        <Typography
          sx={{
            maxWidth: 620,
            letterSpacing: "-0.01em",
          }}
          variant="h6"
        >
          TicTask brings planning, collaboration, automation and insight
          together in one focused workspace — without the complexity of
          traditional project management tools.
        </Typography>
      </Box>

     <Box
        sx={{
          border: "1px solid color-mix(in srgb, var(--flair) 18%, transparent)",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "color-mix(in srgb, currentColor 2.5%, transparent)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "1.15fr 1.35fr 0.85fr 1.35fr",
            gap: 2,
            px: 3,
            py: 1.75,
            borderBottom:
              "1px solid color-mix(in srgb, currentColor 10%, transparent)",
          }}
        >
          {["Capability", "Core functionality", "Paid Plan Unlocks", "Why it matters"].map(
            (label) => (
              <Typography
                key={label}
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--disabled)",
                  alignSelf: "center"
                }}
              >
                {label}
              </Typography>
            )
          )}
        </Box>

        <Stack divider={
          <Box
            sx={{
              height: "1px",
              bgcolor: "color-mix(in srgb, currentColor 8%, transparent)",
            }}
          />
        }>
          {CoreFeatures.map((feature) => (
            <Box
              key={feature.name}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1.15fr 1.35fr 0.85fr 1.35fr",
                },
                gap: { xs: 1.25, md: 2 },
                alignItems: { md: "center" },
                px: { xs: 2.25, md: 3 },
                py: { xs: 2.25, md: 2.5 },
                transition: "background 180ms ease",
                "&:hover": {
                  bgcolor:
                    "color-mix(in srgb, var(--flair) 6%, transparent)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  fontSize: { xs: "1.05rem", md: "1.12rem" },
                }}
              >
                {feature.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  opacity: 0.8,
                  letterSpacing: "-0.01em",
                }}
              >
                {feature.core}
              </Typography>

              <Box>
                {feature.gated ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 0.5 }}>
                    {feature.gated.map((f, index) => (
                      <Typography
                        key={`${feature.name}-${f}-${index}`}
                        sx={{
                          fontSize: 12,
                          letterSpacing: "0.04em",
                          color: "var(--flair)",
                        }}
                      >
                        - {f.split(",").join(" ")}
                      </Typography>
                    ))}
                  </Box>
                ) : (
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--disabled)",
                    }}
                  >
                    Open
                  </Typography>
                )}
              </Box>

              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  letterSpacing: "-0.015em",
                  maxWidth: 420,
                }}
              >
                {feature.pro}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

const CoreFeatures = [
  {
    name: "Multi-faceted tickets",
    core: "10+ ticket types with assignment, tags, attachments and history",
    gated: ["Invoice tickets", "Ticket limits", "Ticket Comments"],
    pro: "One object model for tasks, issues, meetings, notes — and invoice",
  },
  {
    name: "AI assistance",
    core: "Create, summarize, and rewrite tickets from natural language",
    gated: ["AI limits", "Workflow automation"],
    pro: "Automation reads and writes tickets without extra tools.",
  },
  {
    name: "Notifications",
    core: "Email and in-app alerts with personalised settings",
    gated: ["Push", "Ticket Reminders"],
    pro: "Stay in the loop on the web or email. Upgrade when work needs to buzz your device.",
  },
  {
    name: "Team membership",
    core: "Join teams by invite and collaborate on shared tickets",
    gated: ["Owner", "Team limits"],
    pro: "Free accounts can be invited in. Paid owners can create teams.",
  },
  {
    name: "Planner & calendar",
    core: "Calendar views for dated tickets, deadlines, and events",
    gated: ["Timeline", "Gantt"],
    pro: "Plan with Calendar. Upgrade unlocks Timeline & Gantt view.",
  },
  {
    name: "Blogging & community",
    core: "Open to every member: resources, templates, blogs, and FAQs",
    gated: null,
    pro: "Community sit next to the workspace, not behind a paywall.",
  },
  {
    name: "Build with us",
    core: "Open feedback, roadmap insights and co-building open source",
    gated: null,
    pro: "The workspace is designed to grow with the people using it.",
  },
];

export default IndexInsight;