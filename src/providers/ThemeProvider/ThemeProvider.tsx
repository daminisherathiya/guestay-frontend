"use client";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

import { theme } from "@/theme/theme";

import { ThemeProviderProps } from "./ThemeProvider.types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
