/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS-variable-backed palette — set by ThemeProvider via --kv-p-{level}
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
      keyframes: {
        'progress-shimmer': {
          '0%':   { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(500%) skewX(-12deg)' },
        },
        'progress-indeterminate': {
          '0%':        { transform: 'translateX(-100%)' },
          '60%, 100%': { transform: 'translateX(350%)' },
        },
      },
      animation: {
        'progress-shimmer':       'progress-shimmer 1.8s linear infinite',
        'progress-indeterminate': 'progress-indeterminate 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
