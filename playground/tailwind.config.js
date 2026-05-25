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
    },
  },
  plugins: [],
};
