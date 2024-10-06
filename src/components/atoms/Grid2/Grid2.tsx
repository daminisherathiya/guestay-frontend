import React from "react";

import MUIGrid2, { Grid2Props as MUIGrid2Props } from "@mui/material/Grid2";

export interface Grid2Props extends MUIGrid2Props {}

export const Grid2 = React.forwardRef<HTMLDivElement, Grid2Props>(
  (props, ref) => <MUIGrid2 ref={ref} {...props} />,
);

Grid2.displayName = "Grid2";
