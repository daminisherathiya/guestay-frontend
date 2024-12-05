import { forwardRef } from "react";

import MUISkeleton, {
  SkeletonProps as MUISkeletonProps,
} from "@mui/material/Skeleton";

export interface SkeletonProps extends MUISkeletonProps {}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => <MUISkeleton ref={ref} {...props} />,
);

Skeleton.displayName = "Skeleton";
