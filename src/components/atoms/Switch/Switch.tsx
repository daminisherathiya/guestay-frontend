import { forwardRef } from "react";

import MUISwitch, { SwitchProps as MUISwitchProps } from "@mui/material/Switch";

export interface SwitchProps extends MUISwitchProps {}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => <MUISwitch ref={ref} {...props} />,
);

Switch.displayName = "Switch";
