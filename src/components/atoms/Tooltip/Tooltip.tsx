import { forwardRef } from "react";

import MUITooltip, {
  TooltipProps as MUITooltipProps,
} from "@mui/material/Tooltip";

export interface TooltipProps extends MUITooltipProps {}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => <MUITooltip ref={ref} {...props} />,
);

Tooltip.displayName = "Tooltip";
