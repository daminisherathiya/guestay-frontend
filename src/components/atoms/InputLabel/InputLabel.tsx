import { forwardRef } from "react";

import MUIInputLabel, {
  InputLabelProps as MUIInputLabelProps,
} from "@mui/material/InputLabel";

export interface InputLabelProps extends MUIInputLabelProps {}

export const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(
  (props, ref) => <MUIInputLabel ref={ref} {...props} />,
);

InputLabel.displayName = "InputLabel";
