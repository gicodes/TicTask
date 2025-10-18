import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f9f9fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#111117',
      secondary: '#555',
    },
    primary: {
      main: '#f38600',
    },
    success: {
      main: '#228B22',
    },
    warning: {
      main: '#ff9800',
    },
    divider: '#ddd',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f9f9fb',
          color: '#111117',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgb(17, 16, 23)',
      paper: 'rgb(28, 28, 33)',
    },
    text: {
      primary: '#ededed',
      secondary: '#aaa',
    },
    primary: {
      main: '#f38600',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ffb74d',
    },
    divider: '#333',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'rgb(17, 16, 23)',
          color: '#ededed',
        },
      },
    },
  },
});