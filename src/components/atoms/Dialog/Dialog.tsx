import React from "react";

import MUIDialog, { DialogProps as MUIDialogProps } from "@mui/material/Dialog";

export interface DialogProps extends MUIDialogProps {}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (props, ref) => <MUIDialog ref={ref} {...props} />,
);

Dialog.displayName = "Dialog";
