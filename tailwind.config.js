/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // Disabled - site is always light mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'Arial', 'Helvetica', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
      },
      colors: {
        // Whites Palette
        'pure-white': '#ffffff',
        'chalk': '#fffffc',
        'white-porcelain': '#f8fbf8',
        'flower-blue': '#f7fcfe',
        'purple-water': '#e7e7eb',
        // Blacks Palette
        'black-1': '#111111',
        'black-2': '#101010',
        'black-3': '#121212',
        'black-4': '#161616',
        'black-5': '#191919',
        'black-6': '#1a1a1a',
        // Primary Website Color
        'primary': '#1b2b41',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

