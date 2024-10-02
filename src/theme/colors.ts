// References:
// - https://mui.com/material-ui/customization/dark-mode/
// - https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette

export const palette = {
  // Override the MUI defaults
  action: {
    active: "#222222", //todo drawer
    disabled: "#00ff00",
    disabledBackground: "#00ff00",
    focus: "#00ff00",
    hover: "#00ff00",
    selected: "#00ff00",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff", //Todo drawer
  },
  // border: {
  //   dark: "#00ff00",
  //   light: "#00ff00",
  //   main: "#00ff00",
  //   primary: "#00ff00",
  // },
  common: {
    black: "#000000",
    // transparent: "#00000000",
    white: "#ffffff",
  },
  divider: "#dddddd",
  error: {
    main: "#00ff00",
  },
  primary: {
    contrastText: "#222222",
    dark: "#00ff00",
    light: "#00ff00",
    main: "#E61E4D",
  },
  secondary: {
    contrastText: "#ffffff",
    dark: "#000000",
    light: "#00ff00",
    main: "#222222",
  },
  // warning: {},
  // info: {},
  success: {
    main: "#00ff00",
  },
  text: {
    disabled: "#00ff00",
    // icon: "#00ff00",
    primary: "#222222",
    secondary: "#6a6a6a",
  },
};
