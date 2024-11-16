import { forwardRef } from "react";

import MUIDialogActions, {
  DialogActionsProps as MUIDialogActionsProps,
} from "@mui/material/DialogActions";

export interface DialogActionsProps extends MUIDialogActionsProps {}

export const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(
  (props, ref) => <MUIDialogActions ref={ref} {...props} />,
);

DialogActions.displayName = "DialogActions";
