/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        userBgColor: '#efebe2',
        adminBgColor: 'rgb(11 142 140)',
      },
    },
  },
  plugins: [],
}
