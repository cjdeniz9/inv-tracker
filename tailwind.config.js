/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "anti-flash-white": "#F3F3F3",
        "bright-gray": "#EDEDED",
        "american-silver": "#CFCFCF",
        "quick-silver": "#A1A5A4",
        "onyx-gray": "#393939",
        "slate-gray": "#718096",
        "granite-gray": "#5F5F5F",
        "raisin-black": "#242424",
        "salem-green": "#1D8751",
        "cinnabar-red": "#E53E3E",
        "tufts-blue": "#3182CE",
        "blue-ryb": "#003EFF",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
