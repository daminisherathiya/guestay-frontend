import React from "react";

import MUIDrawer, { DrawerProps as MUIDrawerProps } from "@mui/material/Drawer";

export interface DrawerProps extends MUIDrawerProps {}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (props, ref) => <MUIDrawer ref={ref} {...props} />,
);

Drawer.displayName = "Drawer";