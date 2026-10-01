import { Box, Typography } from "@mui/material";

const voices = [
  {
    quote: "I stopped explaining the tool in standups. The board is the standup.",
    who: "Product lead",
    where: "Seed-stage team",
  },
  {
    quote: "They invited me in on a free account. I still have my own workspace.",
    who: "Contractor",
    where: "Joined as member",
  },
  {
    quote: "Invoice as a ticket type is the first time billing felt like part of delivery.",
    who: "Independent studio",
    where: "Standard plan",
  },
];

export const Voices = () => (
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
      from the workspace
    </Typography>

    <Box sx={{ display: "grid", gap: { xs: 8, md: 12 } }}>
      {voices.map((item, i) => (
        <Box
          key={item.who}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: i % 2 ? "0.34fr 0.66fr" : "0.66fr 0.34fr" },
            gap: 3,
            alignItems: "end",
          }}
        >
          <Typography
            sx={{
              order: { md: i % 2 ? 2 : 1 },
              fontSize: { xs: "1.7rem", md: "2.35rem" },
              lineHeight: 1.15,
              letterSpacing: "-0.045em",
              fontWeight: 400,
              maxWidth: 720,
            }}
          >
            “{item.quote}”
          </Typography>
          <Box sx={{ order: { md: i % 2 ? 1 : 2 } }}>
            <Typography sx={{ letterSpacing: "-0.03em" }}>{item.who}</Typography>
            <Typography sx={{ opacity: 0.45, fontSize: 14 }}>{item.where}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);