import React from "react";

import MUILinearProgress, {
  LinearProgressProps as MUILinearProgressProps,
} from "@mui/material/LinearProgress";

export interface LinearProgressProps extends MUILinearProgressProps {}

export const LinearProgress = React.forwardRef<
  HTMLDivElement,
  LinearProgressProps
>((props, ref) => <MUILinearProgress ref={ref} {...props} />);

LinearProgress.displayName = "LinearProgress";
