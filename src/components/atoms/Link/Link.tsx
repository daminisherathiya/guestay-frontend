import React from "react";

import MUILink, { LinkProps as MUILinkProps } from "@mui/material/Link";

export interface LinkProps extends MUILinkProps {}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <MUILink ref={ref} {...props} />,
);

Link.displayName = "Link";