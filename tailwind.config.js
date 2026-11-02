/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#102F70',
        secondary: '#941F25',
        paper: '#FAF7F2',
        beige: '#C49A7D',
        peach: '#E7CFC1',
        dark: '#252323',
      },
      fontFamily: {
        'hand-heading': ["'Patrick Hand'", "'Mali'", 'cursive'],
        'hand-script': ["'Caveat'", 'cursive'],
        'hand-playful': ["'Mali'", 'cursive'],
        'serif-body': ["'Cormorant Garamond'", 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

