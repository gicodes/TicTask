import DOMPurify from "dompurify";
import { Box } from "@mui/material";

interface Props {
  html?: string | null;
}

export function RichTextViewer({ html }: Props) {
  if (!html?.trim()) return null;

  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        my: 1.5,
        px: { xs: 2, sm: 2.5 },
        py: { xs: 1.75, sm: 2.25 },
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "white",
        color: "black",

        fontSize: { xs: "0.875rem", sm: "0.925rem" },
        lineHeight: 1.75,
        letterSpacing: "0.01em",

        "& p": {
          margin: "0 0 1rem",
          "&:last-child": {
            marginBottom: 0,
          },
        },

        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: "text.primary",
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: "-0.015em",
          mt: 2,
          mb: 1,
          "&:first-of-type": {
            mt: 0,
          },
        },

        "& h1": {
          fontSize: { xs: "1.35rem", sm: "1.5rem" },
        },

        "& h2": {
          fontSize: { xs: "1.2rem", sm: "1.3rem" },
        },

        "& h3": {
          fontSize: { xs: "1.05rem", sm: "1.15rem" },
        },

        "& h4, & h5, & h6": {
          fontSize: "1rem",
        },

        "& ul, & ol": {
          pl: 3,
          my: 1.25,
        },

        "& li": {
          pl: 0.5,
          mb: 0.5,
          "&::marker": {
            color: "text.secondary",
          },
        },

        "& li > ul, & li > ol": {
          my: 0.5,
        },

        "& a": {
          color: "primary.main",
          fontWeight: 500,
          textDecoration: "none",
          borderBottom: "1px solid",
          borderColor: "rgba(99, 102, 241, 0.3)",
          transition: "all 0.15s ease",

          "&:hover": {
            borderColor: "currentColor",
            backgroundColor: "rgba(99, 102, 241, 0.06)",
          },
        },

        "& code": {
          px: 0.6,
          py: 0.2,
          borderRadius: 0.75,
          bgcolor: "action.hover",
          color: "text.primary",
          fontFamily:
            '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
          fontSize: "0.85em",
        },

        "& pre": {
          position: "relative",
          my: 1.5,
          p: 1.75,
          borderRadius: 2,
          bgcolor: "rgba(0, 0, 0, 0.22)",
          border: "1px solid",
          borderColor: "divider",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",

          fontFamily:
            '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
          fontSize: { xs: "0.75rem", sm: "0.8rem" },
          lineHeight: 1.65,

          "& code": {
            p: 0,
            bgcolor: "transparent",
            borderRadius: 0,
            fontSize: "inherit",
          },
        },

        "& blockquote": {
          position: "relative",
          my: 1.5,
          mx: 0,
          pl: 2,
          py: 0.5,
          borderLeft: "3px solid",
          borderColor: "primary.main",
          color: "text.secondary",
          fontStyle: "italic",

          "& p": {
            mb: 0,
          },
        },

        "& hr": {
          my: 2,
          border: 0,
          borderTop: "1px solid",
          borderColor: "divider",
        },

        "& img": {
          display: "block",
          maxWidth: "100%",
          height: "auto",
          my: 1.5,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        },

        "& table": {
          width: "100%",
          my: 1.5,
          borderCollapse: "separate",
          borderSpacing: 0,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
          fontSize: "0.875rem",
        },

        "& th, & td": {
          px: 1.5,
          py: 1,
          textAlign: "left",
          borderBottom: "1px solid",
          borderColor: "divider",
        },

        "& th": {
          bgcolor: "action.hover",
          fontWeight: 700,
        },

        "& tr:last-child td": {
          borderBottom: 0,
        },

        "& strong, & b": {
          fontWeight: 700,
        },

        "& em, & i": {
          color: "text.secondary",
        },

        '& input[type="checkbox"]': {
          mr: 1,
          accentColor: "primary.main",
        },

        "& br + br": {
          display: "none",
        },

        // Selection
        "& ::selection": {
          backgroundColor: "rgba(99, 102, 241, 0.2)",
        },
      }}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}