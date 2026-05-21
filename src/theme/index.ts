export type ThemeVariant = 'light' | 'dark' | 'glass';
export type ThemeRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ThemeBlur = 'none' | 'sm' | 'md' | 'lg';

export interface ThemeConfig {
  variant: ThemeVariant;
  radius?: ThemeRadius;
  blur?: ThemeBlur;
}

export const defaultTheme: ThemeConfig = {
  variant: 'light',
  radius: 'md',
  blur: 'md',
};

// Future: export a tailwindcss plugin/preset built from ThemeConfig
