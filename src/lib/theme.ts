import { createTheme } from '@mui/material/styles';

export const baseButtonStyle = {
  borderRadius: '9999px',
  height: 48,
  padding: '5px 20px',
  fontSize: '16px',
  fontWeight: 600,
  boxShadow: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    opacity: 0.9,
    boxShadow: 'none',
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...baseButtonStyle,
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...baseButtonStyle,
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
  },
});
