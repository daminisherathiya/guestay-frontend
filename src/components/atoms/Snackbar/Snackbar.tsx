import React from "react";

import MUISnackbar, {
  SnackbarProps as MUISnackbarProps,
} from "@mui/material/Snackbar";

export interface SnackbarProps extends MUISnackbarProps {}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (props, ref) => <MUISnackbar ref={ref} {...props} />,
);

Snackbar.displayName = "Snackbar";
