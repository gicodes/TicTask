import DOMPurify from "dompurify";
import { Typography } from "@mui/material";

interface Props {
  html?: string | null;
}

export function RichTextViewer({ html }: Props) {
  if (!html) return null;

  const formatted = html.replace(/\n/g, "<br />");
  const clean = DOMPurify.sanitize(formatted);

  return (
    <Typography
      variant="body2"
      sx={{
        my: 1,
        opacity: 0.85,
        "& ul": { paddingLeft: 3 },
        "& ol": { paddingLeft: 3 },
        "& blockquote": {
          borderLeft: "4px solid",
          borderColor: "divider",
          pl: 2,
          opacity: 0.8,
          fontStyle: "italic",
        },
        "& pre": {
          bgcolor: "rgba(0,0,0,0.25)",
          p: 1.5,
          borderRadius: 1,
          fontFamily: "monospace",
          overflowX: "auto",
        },
        "& a": {
          color: "primary.main",
          textDecoration: "underline",
        },
        "& p": {
          margin: "6px 0 8px",
        },
      }}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
