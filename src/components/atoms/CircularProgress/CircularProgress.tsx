import { forwardRef } from "react";

import MUICircularProgress, {
  CircularProgressProps as MUICircularProgressProps,
} from "@mui/material/CircularProgress";

export interface CircularProgressProps extends MUICircularProgressProps {}

export const CircularProgress = forwardRef<
  HTMLDivElement,
  CircularProgressProps
>((props, ref) => <MUICircularProgress ref={ref} {...props} />);

CircularProgress.displayName = "CircularProgress";
