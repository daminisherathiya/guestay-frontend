import { forwardRef } from "react";

import MUIMenu, { MenuProps as MUIMenuProps } from "@mui/material/Menu";

export interface MenuProps extends MUIMenuProps {}

export const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => (
  <MUIMenu ref={ref} {...props} />
));

Menu.displayName = "Menu";
