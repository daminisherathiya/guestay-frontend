import React from "react";

import MUIBox, { BoxProps as MUIBoxProps } from "@mui/material/Box";

export type BoxProps = MUIBoxProps;

export const Box = React.forwardRef(function Box<C extends React.ElementType>(
  props: MUIBoxProps<C>,
  ref: React.Ref<Element>,
) {
  return <MUIBox ref={ref} {...props} />;
});

Box.displayName = "Box";
