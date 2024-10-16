import React from "react";

import MUITextareaAutosize, {
  TextareaAutosizeProps as MUITextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";

export interface TextareaAutosizeProps extends MUITextareaAutosizeProps {}

export const TextareaAutosize = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps
>((props, ref) => <MUITextareaAutosize ref={ref} {...props} />);

TextareaAutosize.displayName = "TextareaAutosize";
