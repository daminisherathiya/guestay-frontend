import type { Config } from "tailwindcss";

import { breakpointsInTailwindCssFormat } from "./breakpoints";
import { palette } from "./colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: "#html",
  plugins: [],
  theme: {
    colors: palette,
    extend: {},
    screens: breakpointsInTailwindCssFormat,
  },
};
export default config;