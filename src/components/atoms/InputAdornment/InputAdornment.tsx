import React from "react";

import MUIInputAdornment, {
  InputAdornmentProps as MUIInputAdornmentProps,
} from "@mui/material/InputAdornment";

export interface InputAdornmentProps extends MUIInputAdornmentProps {}

export const InputAdornment = React.forwardRef<
  HTMLDivElement,
  InputAdornmentProps
>((props, ref) => <MUIInputAdornment ref={ref} {...props} />);

InputAdornment.displayName = "InputAdornment";
