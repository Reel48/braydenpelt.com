/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'Georgia', 'serif'],
        heading: ['var(--font-heading)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        // Main Colors
        'anchor-navy': '#344a5f',
        'primary-blue': '#2a94d6',
        'slate-grey': '#f0f1f2',
        white: '#ffffff',
        // Secondary Colors
        'secondary-blue': '#4eb1cb',
        'secondary-red': '#cf5c60',
        'secondary-purple': '#717ecd',
        'secondary-green': '#4ab471',
        'secondary-yellow': '#f3ae4e',
        'secondary-pink': '#d96383',
        // Legacy primary mapping for easy migration
        primary: {
          50: '#f0f1f2',
          100: '#e0e3e5',
          200: '#c1c7cb',
          300: '#a2abb1',
          400: '#838f97',
          500: '#2a94d6',
          600: '#2a94d6',
          700: '#2a94d6',
          800: '#344a5f',
          900: '#344a5f',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

