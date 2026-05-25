import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, type Theme, type ThemeName } from './themes';

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'kv-theme';
const DEFAULT_THEME: ThemeName = 'glass-indigo';

function applyTheme(name: ThemeName): void {
  const found = themes.find(t => t.name === name) ?? themes[0];
  const root = document.documentElement;
  (Object.entries(found.colors) as [string, string][]).forEach(([level, value]) => {
    root.style.setProperty(`--kv-p-${level}`, value);
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    const initial = stored ?? DEFAULT_THEME;
    applyTheme(initial);
    return initial;
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (name: ThemeName) => setThemeState(name);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}
