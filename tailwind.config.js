/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          DEFAULT: '#191919',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          DEFAULT: '#64748b',
        },
        // Cores específicas do projeto com detalhes azuis
        'tech-blue': '#2563eb', // Mudou para azul sutil
        'tech-green': '#39B54A',
        'bg-primary': '#191919',
        'bg-secondary': '#1e1e1e',
        // Cores da barra lateral
        'sidebar-bg': '#0a0a0a',
        'sidebar-border': 'rgba(37, 99, 235, 0.2)',
        'sidebar-hover': 'rgba(37, 99, 235, 0.1)',
        'sidebar-active': 'rgba(37, 99, 235, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'mulShdSpin': 'mulShdSpin 1.1s infinite ease',
        'sidebar-glow': 'sidebarGlow 3s ease-in-out infinite',
        'pulse-blue': 'pulseBlue 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        mulShdSpin: {
          '0%, 100%': {
            boxShadow: '0em -2.6em 0em 0em #2563eb, 1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2), 2.5em 0em 0 0em rgba(37, 99, 235, 0.2), 1.75em 1.75em 0 0em rgba(37, 99, 235, 0.2), 0em 2.5em 0 0em rgba(37, 99, 235, 0.2), -1.8em 1.8em 0 0em rgba(37, 99, 235, 0.2), -2.6em 0em 0 0em rgba(37, 99, 235, 0.5), -1.8em -1.8em 0 0em rgba(37, 99, 235, 0.7)'
          },
          '12.5%': {
            boxShadow: '0em -2.6em 0em 0em rgba(37, 99, 235, 0.7), 1.8em -1.8em 0 0em #2563eb, 2.5em 0em 0 0em rgba(37, 99, 235, 0.2), 1.75em 1.75em 0 0em rgba(37, 99, 235, 0.2), 0em 2.5em 0 0em rgba(37, 99, 235, 0.2), -1.8em 1.8em 0 0em rgba(37, 99, 235, 0.2), -2.6em 0em 0 0em rgba(37, 99, 235, 0.2), -1.8em -1.8em 0 0em rgba(37, 99, 235, 0.5)'
          },
          '25%': {
            boxShadow: '0em -2.6em 0em 0em rgba(37, 99, 235, 0.5), 1.8em -1.8em 0 0em rgba(37, 99, 235, 0.7), 2.5em 0em 0 0em #2563eb, 1.75em 1.75em 0 0em rgba(37, 99, 235, 0.2), 0em 2.5em 0 0em rgba(37, 99, 235, 0.2), -1.8em 1.8em 0 0em rgba(37, 99, 235, 0.2), -2.6em 0em 0 0em rgba(37, 99, 235, 0.2), -1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2)'
          },
          '37.5%': {
            boxShadow: '0em -2.6em 0em 0em rgba(37, 99, 235, 0.2), 1.8em -1.8em 0 0em rgba(37, 99, 235, 0.5), 2.5em 0em 0 0em rgba(37, 99, 235, 0.7), 1.75em 1.75em 0 0em #2563eb, 0em 2.5em 0 0em rgba(37, 99, 235, 0.2), -1.8em 1.8em 0 0em rgba(37, 99, 235, 0.2), -2.6em 0em 0 0em rgba(37, 99, 235, 0.2), -1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2)'
          },
          '50%': {
            boxShadow: '0em -2.6em 0em 0em rgba(37, 99, 235, 0.2), 1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2), 2.5em 0em 0 0em rgba(37, 99, 235, 0.5), 1.75em 1.75em 0 0em rgba(37, 99, 235, 0.7), 0em 2.5em 0 0em #2563eb, -1.8em 1.8em 0 0em rgba(37, 99, 235, 0.2), -2.6em 0em 0 0em rgba(37, 99, 235, 0.2), -1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2)'
          },
          '62.5%': {
            boxShadow: '0em -2.6em 0em 0em rgba(37, 99, 235, 0.2), 1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2), 2.5em 0em 0 0em rgba(37, 99, 235, 0.2), 1.75em 1.75em 0 0em rgba(37, 99, 235, 0.5), 0em 2.5em 0 0em rgba(37, 99, 235, 0.7), -1.8em 1.8em 0 0em #2563eb, -2.6em 0em 0 0em rgba(37, 99, 235, 0.2), -1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2)'
          },
          '75%': {
            boxShadow: '0em -2.6em 0em 0em rgba(37, 99, 235, 0.2), 1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2), 2.5em 0em 0 0em rgba(37, 99, 235, 0.2), 1.75em 1.75em 0 0em rgba(37, 99, 235, 0.2), 0em 2.5em 0 0em rgba(37, 99, 235, 0.5), -1.8em 1.8em 0 0em rgba(37, 99, 235, 0.7), -2.6em 0em 0 0em #2563eb, -1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2)'
          },
          '87.5%': {
            boxShadow: '0em -2.6em 0em 0em rgba(37, 99, 235, 0.2), 1.8em -1.8em 0 0em rgba(37, 99, 235, 0.2), 2.5em 0em 0 0em rgba(37, 99, 235, 0.2), 1.75em 1.75em 0 0em rgba(37, 99, 235, 0.2), 0em 2.5em 0 0em rgba(37, 99, 235, 0.2), -1.8em 1.8em 0 0em rgba(37, 99, 235, 0.5), -2.6em 0em 0 0em rgba(37, 99, 235, 0.7), -1.8em -1.8em 0 0em #2563eb'
          },
        },
        // Animação para barra lateral
        sidebarGlow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(37, 99, 235, 0.2)',
            borderColor: 'rgba(37, 99, 235, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)',
            borderColor: 'rgba(37, 99, 235, 0.4)',
          },
        },
        pulseBlue: {
          '0%, 100%': {
            opacity: '0.2',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'scale(1.05)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sidebar-gradient': 'linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.05) 50%, rgba(37, 99, 235, 0.1) 100%)',
      },
      // Utilitários específicos para barra lateral
      width: {
        'sidebar': '4px',
        'sidebar-expanded': '60px',
      },
      height: {
        'sidebar': '100vh',
      },
    },
  },
  plugins: [],
}