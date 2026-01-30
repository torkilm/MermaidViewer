/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.tsx",
    "./components/**/*.{ts,tsx}",
    "./services/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ms-primary': {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          lighter: '#334155',
        },
        'ms-accent': {
          DEFAULT: '#06B6D4',
          hover: '#0891B2',
          light: '#22D3EE',
        },
        'ms-success': {
          DEFAULT: '#10B981',
          hover: '#059669',
          light: '#34D399',
        },
        'ms-warning': {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FBBF24',
        },
        'ms-error': {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#F87171',
        },
        'ms-text': {
          primary: '#F1F5F9',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
          dark: '#64748B',
        },
        'ms-border': {
          DEFAULT: '#334155',
          light: '#475569',
          lighter: '#64748B',
        },
      },
    },
  },
  plugins: [],
}
