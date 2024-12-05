import type { Config } from "tailwindcss";

import { breakpointsInTailwindCssFormat } from "./breakpoints";
import { palette } from "./colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  important: "#html",
  plugins: [],
  theme: {
    colors: palette,
    extend: {
      borderRadius: {
        pill: "6.25rem",
      },
      boxShadow: {
        black: "0 0 0 2px #000000",
        button: "0 6px 20px rgba(0,0,0,0.2)",
      },
      dropShadow: {
        elevated: "0px 2px 8px rgba(0,0,0,0.32)",
      },
    },
    screens: breakpointsInTailwindCssFormat,
  },
};
export default config;
