import React from "react";

import MUITextField, {
  OutlinedTextFieldProps as MUIOutlinedTextFieldProps,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material/TextField";

export type TextFieldProps = MUITextFieldProps;
export type OutlinedTextFieldProps = MUIOutlinedTextFieldProps;

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => <MUITextField ref={ref} {...props} />,
);

TextField.displayName = "TextField";
