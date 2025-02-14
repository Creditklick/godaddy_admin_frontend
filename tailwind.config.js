// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontSize: {
//         ssm: "13px", 
//       },
//     },
//   },
//   plugins: [],
// }




/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        ssm: "13px", 
      },
      animation: {
        moveLine: 'moveLine 35s infinite linear', // Define the custom animation
      },
      keyframes: {
        moveLine: {
          '0%': { transform: 'translateX(100%)' }, // Start off-screen on the left
          '100%': { transform: 'translateX(-100%)' }, // Move to the right end of the screen
        },
      },
    },
  },
  plugins: [],
};


