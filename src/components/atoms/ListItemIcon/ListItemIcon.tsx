import React from "react";

import MUIListItemIcon, {
  ListItemIconProps as MUIListItemIconProps,
} from "@mui/material/ListItemIcon";

export interface ListItemIconProps extends MUIListItemIconProps {}

export const ListItemIcon = React.forwardRef<HTMLDivElement, ListItemIconProps>(
  (props, ref) => <MUIListItemIcon ref={ref} {...props} />,
);

ListItemIcon.displayName = "ListItemIcon";
