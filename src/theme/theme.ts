import createTheme from "@mui/material/styles/createTheme";

import { breakpoints } from "./breakpoints";
import { palette } from "./colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
    "2xs": true;
    "3xl": true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    icon?: string;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    "landing-banner": string;
    "light-paper": string;
  }
}

/* eslint-disable sort-keys */
const theme = createTheme({
  typography: {
    fontFamily: "AirbnbCereal, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "2.25rem",
    },
    h2: {
      fontSize: "1.375rem",
      fontWeight: 500,
      lineHeight: "1.625rem",
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: "1.5rem",
    },
    // h4: {
    //   fontSize: "1.25rem",
    //   fontWeight: 700,
    // },
    body1: {
      fontSize: "1rem",
    },
    // body2: {
    //   fontSize: "0.875rem",
    //   lineHeight: "1.3125rem",
    // },
    // caption: {
    //   fontSize: "0.625rem",
    // },
  },
  palette: { mode: "light", ...palette },
  breakpoints: { values: breakpoints },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          textTransform: "none",
        },
        sizeMedium: {
          padding: "0.421875rem 1rem",
          fontSize: "0.875rem",
        },
        sizeLarge: {
          padding: "0.625rem 2rem",
          fontSize: "1rem",
        },
        outlined: {
          "&:hover": {
            borderColor: palette.common.black,
          },
          borderColor: palette.divider,
          color: palette.common.black,
        },
        text: {
          "&:hover": {
            textDecoration: "underline",
          },
          color: palette.common.black,
          textDecoration: "underline",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(34, 34, 34, 0.6)",
        },
      },
    },
  },
});
/* eslint-enable sort-keys */

// theme.typography.h1[theme.breakpoints.down("lg")] = {
//   fontSize: "2.5rem",
//   lineHeight: "3.25rem",
// };
theme.typography.h1[theme.breakpoints.down("md")] = {
  fontSize: "1.625rem",
};
// theme.typography.h1[theme.breakpoints.down("sm")] = {
//   fontSize: "2rem",
//   lineHeight: "2.5rem",
// };

// theme.typography.h2[theme.breakpoints.down("lg")] = {
//   fontSize: "2.375rem",
// };
// theme.typography.h2[theme.breakpoints.down("md")] = {
//   fontSize: "2rem",
//   lineHeight: "2.5rem",
// };

// theme.typography.h3[theme.breakpoints.down("sm")] = {
//   fontSize: "1.75rem",
// };

// theme.typography.h4[theme.breakpoints.down("sm")] = {
//   fontSize: "1.125rem",
// };

export { theme };
