'use client';

import { Box, useTheme, alpha } from '@mui/material';
import { ReactNode } from 'react';

export default function WorkspaceShell({
  children,
}: {
  children: ReactNode;
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const gradient = isLight
    ? `linear-gradient(180deg, 
        ${theme.palette.grey[100]} 0%, 
        ${theme.palette.background.default} 100%)`
    : `linear-gradient(180deg, 
        ${theme.palette.grey[900]} 0%, 
        ${theme.palette.background.default} 100%)`;

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 80px)',
        px: { xs: 2, sm: 3, md: 4 },
        pt: 3,
        pb: 10,
        position: 'relative',
        overflow: 'hidden',
        background: gradient,
        transition: 'background 0.4s ease',
      }}
      maxWidth={{ xs: '92vw', sm: 'none'}}
    >
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -100, md: -150 },
          right: { xs: -100, md: -150 },
          width: { xs: 300, md: 500 },
          height: { xs: 300, md: 500 },
          background: `radial-gradient(circle, ${
            alpha(theme.palette.primary.main, isLight ? 0.5 : 0.25)
          } 50%, transparent 50%)`,
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}
