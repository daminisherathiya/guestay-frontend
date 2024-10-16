import React from "react";

import MUIDialogContent, {
  DialogContentProps as MUIDialogContentProps,
} from "@mui/material/DialogContent";

export interface DialogContentProps extends MUIDialogContentProps {}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>((props, ref) => <MUIDialogContent ref={ref} {...props} />);

DialogContent.displayName = "DialogContent";
