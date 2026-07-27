/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f2eb',
        foreground: '#1c1917',
        warm: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
          stone: '#78716c',
          card: '#ffffff',
        },
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f3eee6',
          foreground: '#1c1917',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1c1917',
        },
        muted: {
          DEFAULT: '#e7e2d9',
          foreground: '#78716c',
        },
        border: 'rgba(28, 25, 23, 0.08)',
        ring: '#2563eb',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'sans-serif'],
        silkscreen: ['var(--font-silkscreen)', 'cursive', 'monospace'],
      },
      boxShadow: {
        'warm-card': '0 20px 60px -15px rgba(28, 25, 23, 0.07), 0 0 1px 1px rgba(28, 25, 23, 0.05)',
        'pill-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
