import { forwardRef } from "react";

import Link from "next/link";

import MUITab, { TabProps as MUITabProps } from "@mui/material/Tab";

type TabPropsWithLink = Omit<MUITabProps, "component"> & {
  component: typeof Link;
  href: string;
};

type TabPropsWithoutLink = Omit<MUITabProps, "component"> & {
  component?: Exclude<React.ElementType, typeof Link>;
  href?: never;
};

export type TabProps = TabPropsWithLink | TabPropsWithoutLink;

export const Tab = forwardRef<HTMLDivElement, TabProps>((props, ref) => (
  <MUITab ref={ref} {...props} />
));

Tab.displayName = "Tab";
