/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b1426',
        card: '#111b2e',
        'card-hover': '#16233b',
        'border-default': '#1f2d48',
        'border-hover': '#2a3d5e',
        'banner-red': '#dc2626',
        'cyan-primary': '#00f0ff',
        'cyan-secondary': '#00b4d8',
        'tag-react': '#38bdf8',
        'tag-node': '#22c55e',
        'tag-mongo': '#10b981',
        'text-primary': '#ffffff',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px -3px rgba(0, 240, 255, 0.25)',
        'cyan-glow-lg': '0 0 35px -5px rgba(0, 240, 255, 0.35)',
        'card-subtle': '0 4px 20px rgba(0, 0, 0, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
