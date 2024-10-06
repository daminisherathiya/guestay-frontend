import React from "react";

import MUIContainer, {
  ContainerProps as MUIContainerProps,
} from "@mui/material/Container";

export interface ContainerProps extends MUIContainerProps {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => <MUIContainer ref={ref} {...props} />,
);

Container.displayName = "Container";
