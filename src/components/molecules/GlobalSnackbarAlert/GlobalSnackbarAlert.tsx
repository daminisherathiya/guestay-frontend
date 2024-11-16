"use client";

import { useGlobalSnackbarAlert } from "@/hooks/useGlobalSnackbarAlert";

import { SnackbarAlert } from "../SnackbarAlert";

export function GlobalSnackbarAlert() {
  const {
    globalSnackbarAlertMessage,
    globalSnackbarAlertSeverity,
    globalSnackbarIsOpen,
    setGlobalSnackbarIsOpenFalse,
  } = useGlobalSnackbarAlert();

  return (
    <SnackbarAlert
      alertMessage={globalSnackbarAlertMessage}
      alertSeverity={globalSnackbarAlertSeverity}
      setSnackbarIsOpenFalse={setGlobalSnackbarIsOpenFalse}
      snackbarIsOpen={globalSnackbarIsOpen}
    />
  );
}
