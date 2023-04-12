/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "american-silver": "#CFCFCF",
        "quick-silver": "#A1A5A4",
        "granite-gray": "#5F5F5F",
        "salem-green": "#1D8751",
        "cinnabar-red": "#E53E3E",
        "tufts-blue": "#3182CE",
        "blue-ryb": "#003EFF",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
