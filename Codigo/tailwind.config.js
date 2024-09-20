/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
      },
      colors: {
        'Celeste': '#5C96EB',
        'Rojo': '#C82333',
        'Verde': '#208768',
        'HoverVerde': '#166653',
        'Gris': '#D9D9D9',
        'Amarillo': '#E0A800',
        'Fondo': '#F6F8F9',
        'AzulSlide': '#233C5A',
        'AzulSlide2': '#315D77',
        'RojoSlide': '#E85959',
      },
      fontFamily: {
        'Raleway': ['Raleway', 'sans-serif'],
        'Nunito': ['Nunito, sans-serif'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in',
      },

    },
  },
  plugins: [
    function ({ addUtilities }) {
      const printUtilities = {
        '@media print': {
          '.print': {
            display: 'block',
          },
          '.no-print': {
            display: 'none !important',
          },
        },
      };
      addUtilities(printUtilities, ['responsive']);
    },
    function ({ addUtilities }) {
      const newUtilitiesScroll = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilitiesScroll, ['responsive', 'hover']);
    },
  ],
}
