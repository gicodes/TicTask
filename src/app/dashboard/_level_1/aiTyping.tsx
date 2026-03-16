import { Stack, Avatar, Box } from "@mui/material";
import { SmartToy } from "@mui/icons-material";

export default function AITyping() {
  return (
    <Stack direction="row" spacing={1.5}>
      <Avatar sx={{ bgcolor: "var(--special)" }}>
        <SmartToy fontSize="small" />
      </Avatar>

      <Box
        sx={{
          display: "flex",
          gap: .5,
          p: 1.5,
          borderRadius: 3,
          bgcolor: "background.paper"
        }}
      >
        <span className="ai-dot"></span>
        <span className="ai-dot"></span>
        <span className="ai-dot"></span>
      </Box>

      <style jsx>{`
        .ai-dot {
          width:6px;
          height:6px;
          background:#999;
          border-radius:50%;
          animation: aiTyping 1.4s infinite;
        }

        .ai-dot:nth-child(2){ animation-delay:.2s }
        .ai-dot:nth-child(3){ animation-delay:.4s }

        @keyframes aiTyping {
          0%{ opacity:.2; transform:translateY(0)}
          50%{ opacity:1; transform:translateY(-3px)}
          100%{ opacity:.2; transform:translateY(0)}
        }
      `}</style>
    </Stack>
  )
}