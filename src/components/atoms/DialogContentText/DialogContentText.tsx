import React from "react";

import MUIDialogContentText, {
  DialogContentTextProps as MUIDialogContentTextProps,
} from "@mui/material/DialogContentText";

export interface DialogContentTextProps extends MUIDialogContentTextProps {}

export const DialogContentText = React.forwardRef<
  HTMLDivElement,
  DialogContentTextProps
>((props, ref) => <MUIDialogContentText ref={ref} {...props} />);

DialogContentText.displayName = "DialogContentText";
