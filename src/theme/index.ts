export { ThemeProvider, useTheme } from './ThemeProvider';
export { themes } from './themes';
export type { Theme, ThemeName } from './themes';

// Legacy stubs — kept for forward compatibility
export type ThemeVariant = 'light' | 'dark' | 'glass';
export type ThemeRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ThemeBlur = 'none' | 'sm' | 'md' | 'lg';

export interface ThemeConfig {
  variant: ThemeVariant;
  radius?: ThemeRadius;
  blur?: ThemeBlur;
}

export const defaultTheme: ThemeConfig = {
  variant: 'glass',
  radius: 'md',
  blur: 'md',
};

// Tailwind preset — spread into theme.extend in tailwind.config.js
export const kvTailwindPreset = {
  theme: {
    extend: {
      colors: {
        kv: {
          '50':  'rgb(var(--kv-p-50) / <alpha-value>)',
          '100': 'rgb(var(--kv-p-100) / <alpha-value>)',
          '200': 'rgb(var(--kv-p-200) / <alpha-value>)',
          '300': 'rgb(var(--kv-p-300) / <alpha-value>)',
          '400': 'rgb(var(--kv-p-400) / <alpha-value>)',
          '500': 'rgb(var(--kv-p-500) / <alpha-value>)',
          '600': 'rgb(var(--kv-p-600) / <alpha-value>)',
          '700': 'rgb(var(--kv-p-700) / <alpha-value>)',
        },
      },
    },
  },
};
