import { Dispatch, type ReactNode, SetStateAction } from "react";

export interface GlobalSnackbarAlertContextType {
  globalSnackbarAlertIsOpen: boolean;
  globalSnackbarAlertMessage: string;
  globalSnackbarAlertResetCounter: number;
  globalSnackbarAlertSeverity: "success" | "error";
  setGlobalSnackbarAlertIsOpenFalse: () => void;
  setGlobalSnackbarAlertIsOpenTrue: () => void;
  setGlobalSnackbarAlertMessage: Dispatch<SetStateAction<string>>;
  setGlobalSnackbarAlertResetCounter: Dispatch<SetStateAction<number>>;
  setGlobalSnackbarAlertSeverity: Dispatch<SetStateAction<"success" | "error">>;
}

export interface GlobalSnackbarAlertProviderProps {
  children: ReactNode;
}
