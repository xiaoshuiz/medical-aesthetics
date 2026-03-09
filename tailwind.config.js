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
      backdropBlur: {
        glass: '16px',
      },
      boxShadow: {
        'glow-gold': 'var(--glow-gold)',
        'glow-gold-strong': 'var(--glow-gold-strong)',
        'glow-teal': 'var(--glow-teal)',
        'glow-interactive': 'var(--glow-interactive)',
      },
      backgroundColor: {
        glass: 'var(--glass-bg)',
        'glass-dark': 'var(--glass-bg-dark)',
      },
      borderColor: {
        glass: 'var(--glass-border)',
        'glass-strong': 'var(--glass-border-strong)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      backgroundImage: {
        'gradient-mesh-warm': 'var(--gradient-mesh-warm)',
        'gradient-mesh-cool': 'var(--gradient-mesh-cool)',
        'gradient-mesh-luxe': 'var(--gradient-mesh-luxe)',
        'gradient-cta': 'var(--gradient-cta)',
      },
    },
  },
  plugins: [],
};
