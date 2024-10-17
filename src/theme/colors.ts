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
    disabledBackground: "#dddddd",
    focus: "#00ff00",
    hover: "#f7f7f7",
    selected: "#00ff00",
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
    main: "#c13515",
  },
  primary: {
    contrastText: "#ffffff",
    dark: "#000000",
    light: "#00ff00",
    main: "#222222",
  },
  secondary: {
    contrastText: "#222222",
    dark: darken("#f06a55", 0.05),
    light: "#00ff00",
    main: "#f06a55",
  },
  warning: {
    light: "#fcf2e8",
    main: "#e07912",
  },
  // info: {},
  success: {
    main: "#00ff00",
  },
  text: {
    disabled: "#222222",
    primary: "#222222",
    secondary: "#6a6a6a",
  },
  facebook: "#1877F2",
};
/* eslint-enable sort-keys */
