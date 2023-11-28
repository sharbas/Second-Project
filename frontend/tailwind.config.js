/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      colors: {
        userBgColor: '#efebe2',
        adminBgColor: 'rgb(11 142 140)',
        inputModal:'#4c4e4e',
        hotelDashboardbg:'#8884d8',
      },
      customMaxHeight: {
        modalHeight:'120rem', /* Set your desired maximum height here */
      }
     
    },
  },
  plugins: [],
}
