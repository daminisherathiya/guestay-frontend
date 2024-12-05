import { forwardRef } from "react";

import MUIOutlinedInput, {
  OutlinedInputProps as MUIOutlinedInputProps,
} from "@mui/material/OutlinedInput";

export interface OutlinedInputProps extends MUIOutlinedInputProps {}

export const OutlinedInput = forwardRef<HTMLDivElement, OutlinedInputProps>(
  (props, ref) => <MUIOutlinedInput ref={ref} {...props} />,
);

OutlinedInput.displayName = "OutlinedInput";
