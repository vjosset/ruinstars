/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#000000',    // Very dark background
        },
        foreground: {
          DEFAULT: '#dddddd',    // Main text color
        },
        main: {
          DEFAULT: '#c54c21',    // Main color
        },
        card: {
          DEFAULT: '#110e0c',    // Card background
        },
        border: {
          DEFAULT: '#555555',    // Subtle border
        },
        muted: {
          DEFAULT: '#999999',    // For secondary/inactive text
        },
      },
      fontFamily: {
        title: ['title', 'ui-serif', 'system-ui'],
        main: ['main', 'ui-sans-serif', 'system-ui'],
        heading: ['heading', 'ui-sans-serif', 'system-ui'],
        stat: ['stat', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
