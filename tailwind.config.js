// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
      extend: {
        colors: {
          primary: 'red',
          secondary: '#1d4ed8',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };