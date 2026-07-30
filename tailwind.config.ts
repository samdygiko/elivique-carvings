import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4EFE7",
        ink: "#1C1613",
        sienna: "#A64B2A",
        sage: "#6E7A5E",
        muted: "#7A6E63",
      },
      fontFamily: {
        marcellus: ["var(--font-marcellus)", "serif"],
        sora: ["var(--font-sora)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
