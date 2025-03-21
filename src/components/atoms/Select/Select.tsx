import { forwardRef } from "react";

import MUISelect, { SelectProps as MUISelectProps } from "@mui/material/Select";

export type SelectProps = MUISelectProps;

export const Select = forwardRef<HTMLHRElement, SelectProps>((props, ref) => (
  <MUISelect ref={ref} {...props} />
));

Select.displayName = "Select";
