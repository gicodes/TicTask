import { Box, Stack, Typography } from "@mui/material";

const workflows = [
  {
    team: "Product",
    flow: "Think → Ticket → Board → Resolved",
    copy: "Actions as tickets. Status is the standup. Comments replace the side channel.",
  },
  {
    team: "Ops",
    flow: "Issue → Assign → In progress → Closed",
    copy: "Intake does not need a helpdesk suite. Priority, owner, and history live on the same card.",
  },
  {
    team: "Studio / freelance",
    flow: "Brief → Schedule → Deliver → Invoice",
    copy: "The work record and the bill can be the same object once invoice tickets are unlocked.",
  },
  {
    team: "Leadership",
    flow: "Plan → Assign → Measure",
    copy: "Planner and metrics sit on the tickets the team already moves — not a second system of record.",
  },
];

export const Workflows = () => (
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
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "0.42fr 0.58fr" },
        gap: { xs: 6, md: 10 },
        alignItems: "end",
        mb: { xs: 6, md: 10 },
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: "3rem", md: "5.2rem" },
          lineHeight: 1,
          letterSpacing: "-0.07em",
          fontWeight: 450,
        }}
      >
        How teams
        <Box
          component="span"
          sx={{
            display: "block",
            fontStyle: "italic",
            fontWeight: 380,
            letterSpacing: "-0.06em",
            opacity: 0.55,
          }}
        >
          actually run it.
        </Box>
      </Typography>
      <Typography
        sx={{
          maxWidth: 420,
          ml: { md: "auto" },
          fontSize: { xs: 16, md: 18 },
          lineHeight: 1.6,
          opacity: 0.72,
        }}
      >
        Create tickets that can be a task, an issue, a meeting, or an invoice.
        The workflow is the status column. The team is whoever was invited.
      </Typography>
    </Box>

    <Stack>
      {workflows.map((item, i) => (
        <Box
          key={item.team}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "160px 1fr 1.2fr" },
            gap: { xs: 1, md: 4 },
            alignItems: "baseline",
            py: { xs: 3, md: 4 },
            borderTop: "1px solid color-mix(in srgb, currentColor 12%, transparent)",
            "&:last-of-type": {
              borderBottom:
                "1px solid color-mix(in srgb, currentColor 12%, transparent)",
            },
            transition: "padding 200ms ease",
            "&:hover": { pl: { md: 1.5 } },
          }}
        >
          <Typography sx={{ fontSize: 13, opacity: 0.45, fontVariantNumeric: "tabular-nums" }}>
            {String(i + 1).padStart(2, "0")}
          </Typography>
          <Box>
            <Typography sx={{ fontSize: { xs: 22, md: 28 }, letterSpacing: "-0.04em", fontWeight: 500 }}>
              {item.team}
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13, opacity: 0.5, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              {item.flow}
            </Typography>
          </Box>
          <Typography sx={{ fontSize: 16, lineHeight: 1.65, opacity: 0.78, maxWidth: 520 }}>
            {item.copy}
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
);