// References:
// - https://mui.com/material-ui/customization/dark-mode/
// - https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette

import { darken } from "@mui/system";

/* eslint-disable sort-keys */
export const palette = {
  // Override the MUI defaults
  action: {
    active: "#222222",
    disabled: "#ffffff",
    disabledBackground: "#bababa",
    focus: "#00ff00",
    hover: "#f7f7f7",
    selected: "rgba(0, 0, 0, 0.08)",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
    highlight: "#f7f7f7",
  },
  common: {
    black: "#000000",
    transparent: "#00000000",
    white: "#ffffff",
  },
  divider: "#dddddd",
  error: {
    main: "#d32f2f",
    light: "#ef5350",
    dark: "#c62828",
    contrastText: "#fff",
  },
  primary: {
    contrastText: "#ffffff",
    dark: "#000000",
    light: "#00ff00",
    main: "#222222",
  },
  secondary: {
    contrastText: "#ffffff",
    dark: darken("#f06a55", 0.05),
    light: "#00ff00",
    main: "#f06a55",
  },
  warning: {
    main: "#ed6c02",
    light: "#ff9800",
    dark: "#e65100",
    contrastText: "#fff",
  },
  // info: {},
  success: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#fff",
  },
  text: {
    disabled: "#222222",
    primary: "#222222",
    secondary: "#6a6a6a",
  },
  facebook: "#1877F2",
};
/* eslint-enable sort-keys */
