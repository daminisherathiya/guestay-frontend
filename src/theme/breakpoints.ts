/* eslint-disable sort-keys */
export const breakpoints = {
  "2xs": 0,
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  "2xl": 1400,
  "3xl": 1600,
};
/* eslint-enable sort-keys */
export const breakpointsInTailwindCssFormat = Object.fromEntries(
  Object.entries(breakpoints).map(([key, value]) => [key, `${value}px`]),
);
