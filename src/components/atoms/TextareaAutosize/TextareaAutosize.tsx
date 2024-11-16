import { forwardRef } from "react";

import MUITextareaAutosize, {
  TextareaAutosizeProps as MUITextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";

export interface TextareaAutosizeProps extends MUITextareaAutosizeProps {}

export const TextareaAutosize = forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps
>((props, ref) => <MUITextareaAutosize ref={ref} {...props} />);

TextareaAutosize.displayName = "TextareaAutosize";
