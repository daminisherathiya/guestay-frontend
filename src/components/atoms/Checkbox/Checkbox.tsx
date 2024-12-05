import { forwardRef } from "react";

import MUICheckbox, {
  CheckboxProps as MUICheckboxProps,
} from "@mui/material/Checkbox";

export interface CheckboxProps extends MUICheckboxProps {}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => <MUICheckbox ref={ref} {...props} />,
);

Checkbox.displayName = "Checkbox";
