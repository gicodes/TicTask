import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0f172a' },
    secondary: { main: '#334155' },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f8fafc' },
    secondary: { main: '#64748b' },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
});
