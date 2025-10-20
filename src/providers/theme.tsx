'use client';

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '@/lib/theme';
import { CssBaseline } from '@mui/material';

type ThemeContextType = {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
};

const defaultAccent = '#f38600';

function getAccentColor() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim();
    return value || defaultAccent;
  }
  return defaultAccent;
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: getAccentColor() },
    background: { default: 'var(--background)' },
    text: { primary: 'var(--foreground)' },
  },
});

export default theme;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeMode must be used inside ThemeProvider');
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme-mode') as 'light' | 'dark';
    if (saved) setMode(saved);
  }, []);

  const toggleTheme = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('theme-mode', next);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
