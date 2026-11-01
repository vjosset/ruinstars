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
          DEFAULT: '#080808',    // Card background
        },
        border: {
          DEFAULT: '#444',    // Subtle border
        },
        muted: {
          DEFAULT: '#999999',    // For secondary/inactive text
        },
      },
      fontFamily: {
        title: ['"Russo One"', 'ui-serif', 'system-ui'],
        main: ['Rajdhani', 'ui-sans-serif', 'system-ui'],
        heading: ['Rajdhani', 'ui-sans-serif', 'system-ui'],
        stat: ['"Russo One"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
