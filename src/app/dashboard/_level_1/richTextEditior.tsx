import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Link,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import { 
  Code, 
  FormatBold, 
  FormatItalic, 
  FormatListBulleted, 
  FormatListNumbered, 
  FormatQuote, 
  FormatUnderlined, 
  StrikethroughS 
} from '@mui/icons-material';

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
}: Props) {
  const theme = useTheme();
  const editorRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
  };

  const handleLink = () => {
    const url = prompt('Enter the URL:', 'https://');
    if (url) exec('createLink', url);
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && editorRef.current?.contains(sel.anchorNode || null)) {
        setFocused(true);
      } else {
        setFocused(false);
      }
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, []);

  return (
    <Box sx={{ position: 'relative', isolation: 'isolate' }}>
      <ToggleButtonGroup
        size="small"
        sx={{
          position: 'absolute',
          top: { xs: -20, sm: -40 },
          left: '50%',
          bgcolor: alpha(theme.palette.background.paper, 0.98),
          borderRadius: 2,
          boxShadow: theme.shadows[8],
          border: `1px solid ${theme.palette.divider}`,
          zIndex: 1300,
          opacity: focused ? 1 : 0.6,
          pointerEvents: 'auto',
          transition: 'opacity 0.2s, transform 0.2s',
          transform: focused
            ? 'translateX(-50%) translateY(-6px)'
            : 'translateX(-50%) translateY(0)',
        }}
      >
        <Tooltip title="Bold" arrow>
          <ToggleButton value="bold" onMouseDown={(e) => { e.preventDefault(); exec('bold'); }}>
            <FormatBold fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Italic" arrow>
          <ToggleButton value="italic" onMouseDown={(e) => { e.preventDefault(); exec('italic'); }}>
            <FormatItalic fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Underline" arrow>
          <ToggleButton value="underline" onMouseDown={(e) => { e.preventDefault(); exec('underline'); }}>
            <FormatUnderlined fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Strikethrough" arrow>
          <ToggleButton value="strikethrough" onMouseDown={(e) => { e.preventDefault(); exec('strikethrough'); }}>
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

        <Tooltip title="Bullet List" arrow>
          <ToggleButton value="ul" onMouseDown={(e) => { e.preventDefault(); exec('insertUnorderedList'); }}>
            <FormatListBulleted fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Numbered List" arrow>
          <ToggleButton value="ol" onMouseDown={(e) => { e.preventDefault(); exec('insertOrderedList'); }}>
            <FormatListNumbered fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Quote" arrow>
          <ToggleButton value="quote" onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', 'blockquote'); }}>
            <FormatQuote fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Code Block" arrow>
          <ToggleButton value="code" onMouseDown={(e) => { e.preventDefault(); exec('formatBlock', 'pre'); }}>
            <Code fontSize="small" />
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Insert Link" arrow>
          <ToggleButton value="link" onMouseDown={(e) => { e.preventDefault(); handleLink(); }}>
            <Link fontSize="small" />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
      <Typography
        ref={editorRef}
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
          border: '1px solid transparent',
          bgcolor: alpha(theme.palette.background.paper, 0.04),
          transition: 'all 0.2s ease',
          outline: 'none',
          fontSize: 15,
          lineHeight: 1.6,
          fontFamily: theme.typography.fontFamily,
          textAlign: 'left',
          direction: 'ltr',
          '&:focus': {
            borderColor: theme.palette.primary.main,
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
          },
          '&:hover': {
            borderColor: alpha(theme.palette.divider, 0.8),
          },
          '&:empty:before': {
            content: `"${placeholder}"`,
            color: theme.palette.text.disabled,
            pointerEvents: 'none',
          },
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      />
    </Box>
  );
}
