/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Cascadia Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow':  'ping 2s cubic-bezier(0,0,.2,1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  safelist: [
    'line-clamp-2', 'line-clamp-3', 'line-clamp-4', 'line-clamp-5',
    'opacity-0', 'opacity-100', 'translate-y-0', 'translate-y-10',
  ],
  plugins: [],
};
