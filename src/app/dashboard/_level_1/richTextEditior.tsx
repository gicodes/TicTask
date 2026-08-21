import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  StrikethroughS,
  KeyboardReturn,
} from "@mui/icons-material";

export interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function LightweightRichEditor({
  value,
  onChange,
  placeholder = "Start typing your note...",
  autoFocus = false,
}: Props) {
  const theme = useTheme();
  const editorRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  /**
   * Execute a browser editing command while preserving the current selection/caret.
   */
  const exec = (command: string, commandValue?: string) => {
    editorRef.current?.focus();

    document.execCommand(command, false, commandValue);

    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };

  /**
   * Insert a soft line break.
   * Result:
   *   First line<br>
   *   Second line
   *
   * Unlike Enter, this does NOT create a new paragraph.
   */
  const insertNewLine = () => {
    editorRef.current?.focus();

    document.execCommand("insertHTML", false, "<br>");

    handleInput();
  };

  const handleLink = () => {
    editorRef.current?.focus();

    const url = prompt("Enter the URL:", "https://");

    if (url) {
      exec("createLink", url);
    }
  };

  /**
   * Convert browser-generated top-level <div> blocks into our canonical <p> blocks.
   * We only normalize direct children so we don't accidentally modify divs inside other elements.
   */
  const normalizeHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");

    Array.from(doc.body.children).forEach((element) => {
      if (element.tagName.toLowerCase() !== "div") {
        return;
      }

      const p = doc.createElement("p");

      while (element.firstChild) {
        p.appendChild(element.firstChild);
      }

      element.replaceWith(p);
    });

    return doc.body.innerHTML;
  };

  const handleInput = () => {
    if (!editorRef.current) return;

    const html = normalizeHtml(editorRef.current.innerHTML);

    onChange(html);
  };

  useEffect(() => {
    if (!editorRef.current) return;

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  useEffect(() => {
    if (autoFocus) {
      editorRef.current?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();

      if (
        selection &&
        !selection.isCollapsed &&
        editorRef.current?.contains(selection.anchorNode || null)
      ) {
        setFocused(true);
      }
    };

    document.addEventListener("selectionchange", handleSelection);

    return () => {
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []);

  return (
    <Box sx={{ position: "relative", isolation: "isolate" }}>
      <ToggleButtonGroup
        size="small"
        sx={{
          position: "absolute",
          top: { xs: -18, sm: -40 },
          left: "50%",
          bgcolor: alpha(theme.palette.background.paper, 0.98),
          borderRadius: 2,
          boxShadow: theme.shadows[8],
          border: `1px solid ${theme.palette.divider}`,
          zIndex: 1300,
          opacity: focused ? 1 : 0.6,
          pointerEvents: "auto",
          transition: "opacity 0.2s, transform 0.2s",
          transform: focused
            ? "translateX(-50%) translateY(-6px)"
            : "translateX(-50%) translateY(0)",
        }}
      >
        <Tooltip title="Bold" arrow>
          <ToggleButton
            value="bold"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("bold");
            }}
          >
            <FormatBold fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Italic" arrow>
          <ToggleButton
            value="italic"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("italic");
            }}
          >
            <FormatItalic fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Underline" arrow>
          <ToggleButton
            value="underline"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("underline");
            }}
          >
            <FormatUnderlined fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Strikethrough" arrow>
          <ToggleButton
            value="strikethrough"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("strikeThrough");
            }}
          >
            <StrikethroughS fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Box
          component="div"
          sx={{
            width: 1,
            height: 32,
            borderLeft: `1px solid ${theme.palette.divider}`,
            mx: 0.5,
          }}
        />

        <Tooltip title="New line" arrow>
          <ToggleButton
            value="newline"
            aria-label="Insert new line"
            onMouseDown={(e) => {
              e.preventDefault();
              insertNewLine();
            }}
          >
            <KeyboardReturn fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Box
          component="div"
          sx={{
            width: 1,
            height: 32,
            borderLeft: `1px solid ${theme.palette.divider}`,
            mx: 0.5,
          }}
        />

        <Tooltip title="Bullet List" arrow>
          <ToggleButton
            value="ul"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("insertUnorderedList");
            }}
          >
            <FormatListBulleted fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Numbered List" arrow>
          <ToggleButton
            value="ol"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("insertOrderedList");
            }}
          >
            <FormatListNumbered fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Quote" arrow>
          <ToggleButton
            value="quote"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("formatBlock", "blockquote");
            }}
          >
            <FormatQuote fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Code Block" arrow>
          <ToggleButton
            value="code"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("formatBlock", "pre");
            }}
          >
            <Code fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Insert Link" arrow>
          <ToggleButton
            value="link"
            onMouseDown={(e) => {
              e.preventDefault();
              handleLink();
            }}
          >
            <Link fontSize="small" />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>

      <Box
        ref={editorRef}
        component="div"
        contentEditable
        suppressContentEditableWarning
        dir="ltr"
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          minHeight: 160,
          p: 2.5,
          borderRadius: 2,
          border: "1px solid transparent",
          bgcolor: alpha(theme.palette.background.paper, 0.04),
          transition: "all 0.2s ease",
          outline: "none",

          fontSize: 15,
          lineHeight: 1.6,
          fontFamily: theme.typography.fontFamily,
          textAlign: "left",
          direction: "ltr",

          "&:focus": {
            borderColor: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            boxShadow: `0 0 0 3px ${alpha(
              theme.palette.primary.main,
              0.15
            )}`,
          },

          "&:hover": {
            borderColor: alpha(theme.palette.divider, 0.8),
          },

          "&:empty:before": {
            content: `"${placeholder}"`,
            color: theme.palette.text.disabled,
            pointerEvents: "none",
          },

          /* Paragraphs */
          "& p": {
            margin: "0 0 1rem",
          },

          "& p:last-child": {
            marginBottom: 0,
          },

          "& ul, & ol": {
            pl: 3,
            my: 1,
          },

          "& blockquote": {
            my: 1,
            pl: 2,
            borderLeft: "3px solid",
            borderColor: "primary.main",
            color: "text.secondary",
          },

          /* Code */
          "& pre": {
            my: 1,
            p: 1.5,
            borderRadius: 1.5,
            bgcolor: "action.hover",
            overflowX: "auto",
            fontFamily:
              '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
          },

          "& a": {
            color: "primary.main",
          },

          "& br": {
            lineHeight: "inherit",
          },

          wordBreak: "break-word",
        }}
      />
    </Box>
  );
}
