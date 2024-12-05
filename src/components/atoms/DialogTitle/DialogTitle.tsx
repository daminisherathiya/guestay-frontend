import { forwardRef } from "react";

import MUIDialogTitle, {
  DialogTitleProps as MUIDialogTitleProps,
} from "@mui/material/DialogTitle";

export interface DialogTitleProps extends MUIDialogTitleProps {}

export const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(
  (props, ref) => <MUIDialogTitle ref={ref} {...props} />,
);

DialogTitle.displayName = "DialogTitle";
