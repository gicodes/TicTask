'use client';

import React, { useState } from 'react';
import { Box, Stack, Button, Tooltip, IconButton, Snackbar } from '@mui/material';
import { Download, ContentCopy, Code } from '@mui/icons-material';

interface DownloadableTemplateProps {
  children: React.ReactNode;
  filename: string;
  data: Record<string, any>;
  componentCode?: string;
}

export const DownloadableTemplate: React.FC<DownloadableTemplateProps> = ({
  children,
  filename,
  data,
  componentCode,
}) => {
  const [snack, setSnack] = useState<string | null>(null);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSnack('JSON downloaded');
  };

  const copyCode = async () => {
    if (!componentCode) return;
    await navigator.clipboard.writeText(componentCode);
    setSnack('Component code copied');
  };

  const downloadTSX = () => {
    if (!componentCode) return;
    const blob = new Blob([componentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.tsx`;
    a.click();
    URL.revokeObjectURL(url);
    setSnack('TSX downloaded');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover .template-actions': { opacity: 1, pointerEvents: 'auto' },
      }}
    >
      {children}

      <Stack
        className="template-actions"
        direction="row"
        spacing={0.75}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.2s',
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 0.5,
          boxShadow: 3,
          zIndex: 2,
        }}
      >
        <Tooltip title="Download JSON">
          <IconButton size="small" onClick={downloadJSON}>
            <Download fontSize="small" />
          </IconButton>
        </Tooltip>

        {componentCode && (
          <>
            <Tooltip title="Copy component code">
              <IconButton size="small" onClick={copyCode}>
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download .tsx">
              <IconButton size="small" onClick={downloadTSX}>
                <Code fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>

      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack(null)}
        message={snack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};