import { forwardRef } from "react";

import MUIToolbar, {
  ToolbarProps as MUIToolbarProps,
} from "@mui/material/Toolbar";

export interface ToolbarProps extends MUIToolbarProps {}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (props, ref) => <MUIToolbar ref={ref} {...props} />,
);

Toolbar.displayName = "Toolbar";
