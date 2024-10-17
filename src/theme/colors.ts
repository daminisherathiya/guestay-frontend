// References:
// - https://mui.com/material-ui/customization/dark-mode/
// - https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette

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
  },
  common: {
    black: "#000000",
    transparent: "#00000000",
    white: "#ffffff",
  },
  divider: "#dddddd",
  error: {
    main: "#00ff00",
  },
  primary: {
    contrastText: "#ffffff",
    dark: "#000000",
    light: "#00ff00",
    main: "#222222",
  },
  secondary: {
    contrastText: "#222222",
    dark: "#00ff00",
    light: "#00ff00",
    main: "#f06a55",
  },
  // warning: {},
  // info: {},
  success: {
    main: "#00ff00",
  },
  text: {
    disabled: "#222222",
    primary: "#222222",
    secondary: "#6a6a6a",
  },
};
