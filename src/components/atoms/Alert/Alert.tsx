import React from "react";

import MUIAlert, { AlertProps as MUIAlertProps } from "@mui/material/Alert";

export interface AlertProps extends MUIAlertProps {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => <MUIAlert ref={ref} {...props} />,
);

Alert.displayName = "Alert";