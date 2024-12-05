import { forwardRef } from "react";

import MUIFormControl, {
  FormControlProps as MUIFormControlProps,
} from "@mui/material/FormControl";

export interface FormControlProps extends MUIFormControlProps {}

export const FormControl = forwardRef<HTMLHRElement, FormControlProps>(
  (props, ref) => <MUIFormControl ref={ref} {...props} />,
);

FormControl.displayName = "FormControl";
