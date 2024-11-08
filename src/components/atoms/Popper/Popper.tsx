import React from "react";

import MUIPopper, { PopperProps as MUIPopperProps } from "@mui/material/Popper";

export interface PopperProps extends MUIPopperProps {}

export const Popper = React.forwardRef<HTMLDivElement, PopperProps>(
  (props, ref) => <MUIPopper ref={ref} {...props} />,
);

Popper.displayName = "Popper";
