import React from "react";

import MUIPaper, { PaperProps as MUIPaperProps } from "@mui/material/Paper";

export interface PaperProps extends MUIPaperProps {}

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  (props, ref) => <MUIPaper ref={ref} {...props} />,
);

Paper.displayName = "Paper";
