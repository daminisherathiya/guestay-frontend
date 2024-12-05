import { forwardRef } from "react";

import MUIChip, { ChipProps as MUIChipProps } from "@mui/material/Chip";

export interface ChipProps extends MUIChipProps {}

export const Chip = forwardRef<HTMLHRElement, ChipProps>((props, ref) => (
  <MUIChip ref={ref} {...props} />
));

Chip.displayName = "Chip";
