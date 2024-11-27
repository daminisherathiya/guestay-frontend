import { forwardRef } from "react";

import MUITabs, { TabsProps as MUITabsProps } from "@mui/material/Tabs";

export interface TabsProps extends MUITabsProps {}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => (
  <MUITabs ref={ref} {...props} />
));

Tabs.displayName = "Tabs";
