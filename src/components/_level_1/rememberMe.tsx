import React from 'react';
import { RememberMeProps } from '@/types/auth';
import { Typography, Box } from '@mui/material';
import RememberMeOutlined from '@mui/icons-material/RememberMeOutlined';

const RememberMe: React.FC<RememberMeProps> = ({ remember, setRemember }) => {
  return (
    <Box
      role="button"
      onClick={() => setRemember(!remember)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setRemember(!remember);
      }}
      display="flex"
      gap={1}
      sx={{
        cursor: 'pointer',
        borderRadius: 1,
        px: 1,
        py: 0.5,
        outline: 'none',
        transition: 'all 0.2s ease-in-out',
        color: remember ? 'info.main' : 'text.secondary',
        bgcolor: remember ? 'action.selected' : 'transparent',
        '&:hover, &:focus': {
          bgcolor: 'action.hover',
          color: 'info.main',
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          opacity: 0,
          '&:hover': { opacity: 1 },
          '.MuiBox-root:hover &': { opacity: 1 },
          '.MuiBox-root:focus &': { opacity: 1} ,
          transition: 'opacity 0.2s ease-in-out',
        }}
        width={90}
        textAlign={'center'}
      >
        Remember Me
      </Typography>
      <Box display={'flex'} justifyContent={'end'}>
        <RememberMeOutlined fontSize="small" />
      </Box>
    </Box>
  );
};

export default RememberMe;
