import { forwardRef } from "react";

import MUILoadingButton, {
  LoadingButtonProps as MUILoadingButtonProps,
} from "@mui/lab/LoadingButton";

export interface LoadingButtonProps extends MUILoadingButtonProps {}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (props, ref) => <MUILoadingButton ref={ref} {...props} />,
);

LoadingButton.displayName = "LoadingButton";
