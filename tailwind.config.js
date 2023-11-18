/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      lineHeight: {
        "h1-lg": "1.14599",
        "h1-md": "1.175",
        "h1-sm": "1.21875",
        "h2-lg": "1.25",
        "h2-normal": "1.2381",
        p: 1.47376,
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
