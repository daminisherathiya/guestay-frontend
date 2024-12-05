import { forwardRef } from "react";

import MUIButton, { ButtonProps as MUIButtonProps } from "@mui/material/Button";

export interface ButtonProps extends MUIButtonProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <MUIButton ref={ref} {...props} />,
);

Button.displayName = "Button";
