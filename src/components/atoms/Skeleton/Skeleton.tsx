import React from "react";

import MUISkeleton, {
  SkeletonProps as MUISkeletonProps,
} from "@mui/material/Skeleton";

export interface SkeletonProps extends MUISkeletonProps {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => <MUISkeleton ref={ref} {...props} />,
);

Skeleton.displayName = "Skeleton";
