/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-pearl': 'var(--surface-pearl)',
        'accent-gold': 'var(--accent-gold)',
        'accent-gold-dark': 'var(--accent-gold-dark)',
        'functional-clinical': 'var(--functional-clinical)',
        'neutral-100': 'var(--neutral-100)',
        'neutral-200': 'var(--neutral-200)',
        'neutral-300': 'var(--neutral-300)',
        'neutral-400': 'var(--neutral-400)',
        'neutral-500': 'var(--neutral-500)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        mist: 'var(--shadow-mist)',
      },
      spacing: {
        'section': 'var(--section-padding)',
        'special-gap': 'var(--special-gap)',
      },
      screens: {
        mobile: '768px', /* T003: Booking CTA fixed-bottom breakpoint */
      },
    },
  },
  plugins: [],
};
