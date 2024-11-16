import { forwardRef } from "react";

import MUIDivider, {
  DividerProps as MUIDividerProps,
} from "@mui/material/Divider";

export interface DividerProps extends MUIDividerProps {}

export const Divider = forwardRef<HTMLHRElement, DividerProps>((props, ref) => (
  <MUIDivider ref={ref} {...props} />
));

Divider.displayName = "Divider";
