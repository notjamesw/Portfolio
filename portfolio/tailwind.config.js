/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textIndent: {
        '1': '1rem',
        '2': '2rem',
        '4': '4rem',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-indent-1': {
          textIndent: '1rem',
        },
        '.text-indent-2': {
          textIndent: '2rem',
        },
        '.text-indent-4': {
          textIndent: '4rem',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

