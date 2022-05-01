module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        base: "#b2bec3",
        swamp: "#336633",
        mustard: "#FF9900",
        maroon: "#993333",
        maroonDark: "#663333",
        maroonLight: "#CC3333",
        charcoal: "#2d3436",
        aqua: "#009967",
        river: '#636e72',
      },
    },
  },
  variants: {
    extend: {},
  },
};
