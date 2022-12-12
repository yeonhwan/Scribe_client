/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#7372F1',
        'primary-lighter' : '#8686AA',
        'primary-darker' : '#292958',
        'secondary' : '#232326',
        'secondary-darker' : '#1A1A1C',
        'secondary-lighter' : '#4B4B55',
        'navbar-icon' : '#2e3269',
        'navbar-hover' : '#7372F1',
        'gradient-from' : '#333340',
        'gradient-to' : '#29294F',
        'editmode' : '#515034',
        'editinput' : '#333221'
      },
      transitionTimingFunction : {
        'smooth-trans' : 'cubic-bezier(0.5, 0.3, 0.2, 1)'
      }
    },
  },
  plugins: [],
}