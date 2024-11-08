import React from "react";

import MUIStack, { StackProps as MUIStackProps } from "@mui/material/Stack";

export interface StackProps extends MUIStackProps {}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => <MUIStack ref={ref} {...props} />,
);

Stack.displayName = "Stack";
