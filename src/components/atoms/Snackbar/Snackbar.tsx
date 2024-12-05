import { forwardRef } from "react";

import MUISnackbar, {
  SnackbarProps as MUISnackbarProps,
} from "@mui/material/Snackbar";

export interface SnackbarProps extends MUISnackbarProps {}

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (props, ref) => <MUISnackbar ref={ref} {...props} />,
);

Snackbar.displayName = "Snackbar";
