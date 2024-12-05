import { forwardRef } from "react";

import MUITypography, {
  TypographyProps as MUITypographyProps,
} from "@mui/material/Typography";

export interface TypographyProps extends MUITypographyProps {}

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (props, ref) => <MUITypography ref={ref} {...props} />,
);

Typography.displayName = "Typography";
