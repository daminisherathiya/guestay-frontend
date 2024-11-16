import { forwardRef } from "react";

import MUIIconButton, {
  IconButtonProps as MUIIconButtonProps,
} from "@mui/material/IconButton";

export interface IconButtonProps extends MUIIconButtonProps {}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => <MUIIconButton ref={ref} {...props} />,
);

IconButton.displayName = "IconButton";
