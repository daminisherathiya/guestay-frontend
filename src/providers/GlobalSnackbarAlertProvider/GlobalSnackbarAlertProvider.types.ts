import { type ReactNode } from "react";

export interface GlobalSnackbarAlertContextType {
  globalSnackbarAlertMessage: string;
  globalSnackbarAlertSeverity: "success" | "error";
  globalSnackbarIsOpen: boolean;
  setGlobalSnackbarAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  setGlobalSnackbarAlertSeverity: React.Dispatch<
    React.SetStateAction<"success" | "error">
  >;
  setGlobalSnackbarIsOpenFalse: () => void;
  setGlobalSnackbarIsOpenTrue: () => void;
}

export interface GlobalSnackbarAlertProviderProps {
  children: ReactNode;
}
