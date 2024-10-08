/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';
import daisyUi from "daisyui";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {  
      'xxs': {'max': '639px', "min": "0px"},
      'xxl': {'min': '2000px', 'max': '3000px'},
      '3xl': {'min': '3001px'},
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        'custom-spin': 'spin 1s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
        'custom-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1)',
        'custom-pulse-two': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1)'
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10"
      }
    },
    daisyui: {
      themes: ["light", "dark"],
    },
  },
  plugins: [
    daisyUi
  ],
}
