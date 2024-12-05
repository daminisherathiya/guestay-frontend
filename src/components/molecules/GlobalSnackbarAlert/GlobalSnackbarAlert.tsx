"use client";

import { useGlobalSnackbarAlert } from "@/hooks/useGlobalSnackbarAlert";

import { SnackbarAlert } from "../SnackbarAlert";

export function GlobalSnackbarAlert() {
  const {
    globalSnackbarAlertIsOpen,
    globalSnackbarAlertMessage,
    globalSnackbarAlertResetCounter,
    globalSnackbarAlertSeverity,
    setGlobalSnackbarAlertIsOpenFalse,
  } = useGlobalSnackbarAlert();

  return (
    <SnackbarAlert
      key={globalSnackbarAlertResetCounter}
      alertMessage={globalSnackbarAlertMessage}
      alertSeverity={globalSnackbarAlertSeverity}
      setSnackbarIsOpenFalse={setGlobalSnackbarAlertIsOpenFalse}
      snackbarIsOpen={globalSnackbarAlertIsOpen}
    />
  );
}
