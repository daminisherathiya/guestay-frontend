import { SyntheticEvent } from "react";

import { Alert, type AlertProps } from "@/components/atoms/Alert";
import { Snackbar, type SnackbarProps } from "@/components/atoms/Snackbar";

export interface SnackbarAlert {
  alertMessage: string;
  alertSeverity: AlertProps["severity"];
  setSnackbarIsOpenFalse: () => void;
  snackbarIsOpen: SnackbarProps["open"];
}

export function SnackbarAlert({
  alertMessage,
  alertSeverity,
  setSnackbarIsOpenFalse,
  snackbarIsOpen,
}: SnackbarAlert): JSX.Element {
  const handleSnackbarClose = (_?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarIsOpenFalse();
  };

  return (
    <Snackbar
      autoHideDuration={6000}
      open={snackbarIsOpen}
      onClose={handleSnackbarClose}
    >
      <Alert
        className="w-full"
        severity={alertSeverity}
        variant="filled"
        onClose={handleSnackbarClose}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
