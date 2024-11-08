import React from "react";

import MUIMenuItem, {
  MenuItemProps as MUIMenuItemProps,
} from "@mui/material/MenuItem";

export interface MenuItemProps extends MUIMenuItemProps {}

export const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>(
  (props, ref) => <MUIMenuItem ref={ref} {...props} />,
);

MenuItem.displayName = "MenuItem";
