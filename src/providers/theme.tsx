'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from '@/lib/theme';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  mode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeMode must be used within ThemeProvider');
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<ThemeMode>('system');

  useEffect(() => {
    const saved = (localStorage.getItem('theme-mode') as ThemeMode) || 'system';
    setMode(saved);
  }, []);

  const effectiveMode = useMemo(() => {
    if (mode === 'system') return prefersDark ? 'dark' : 'light';
    return mode;
  }, [mode, prefersDark]);

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const setThemeMode = (newMode: ThemeMode) => setMode(newMode);

  const toggleTheme = () => {
    const next =
      mode === 'light' ? 'dark' :
      mode === 'dark' ? 'system' : 'light';
    setMode(next);
  };

  const activeTheme = useMemo(
    () =>
      createTheme({
        ...(effectiveMode === 'light' ? lightTheme : darkTheme),
        palette: {
          ...((effectiveMode === 'light' ? lightTheme : darkTheme).palette),
          mode: effectiveMode,
        },
      }),
    [effectiveMode]
  );

  return (
    <ThemeContext.Provider value={{ mode, setThemeMode, toggleTheme }}>
      <MUIThemeProvider theme={activeTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}