import { forwardRef } from "react";

import MUIContainer, {
  ContainerProps as MUIContainerProps,
} from "@mui/material/Container";

export interface ContainerProps extends MUIContainerProps {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => <MUIContainer ref={ref} {...props} />,
);

Container.displayName = "Container";
