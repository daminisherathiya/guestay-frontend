import { ElementType, Ref, forwardRef } from "react";

import MUIBox, { BoxProps as MUIBoxProps } from "@mui/material/Box";

export type BoxProps = MUIBoxProps;

export const Box = forwardRef(function Box<C extends ElementType>(
  props: MUIBoxProps<C>,
  ref: Ref<Element>,
) {
  return <MUIBox ref={ref} {...props} />;
});

Box.displayName = "Box";
