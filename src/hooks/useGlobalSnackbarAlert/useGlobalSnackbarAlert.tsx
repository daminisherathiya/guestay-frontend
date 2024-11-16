import { useContext } from "react";

import { GlobalSnackbarAlertContext } from "@/providers/GlobalSnackbarAlertProvider/GlobalSnackbarAlertProvider";

export const useGlobalSnackbarAlert = () => {
  const context = useContext(GlobalSnackbarAlertContext);

  if (!context) {
    throw new Error(
      "useGlobalSnackbarAlert must be used within an GlobalSnackbarAlertProvider",
    );
  }

  return context;
};
