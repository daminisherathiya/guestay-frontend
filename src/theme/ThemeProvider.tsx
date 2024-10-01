"use client";

import { ReactNode } from "react";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

import { theme } from "./theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
