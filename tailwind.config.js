module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
        pacifico: ["Pacifico"],
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["active"],
      transform: ["active"],
    },
  },
  plugins: [],
};
