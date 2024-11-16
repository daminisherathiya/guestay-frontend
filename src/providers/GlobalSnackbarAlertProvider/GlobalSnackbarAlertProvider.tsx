"use client";

import React, { createContext, useState } from "react";

import { useBoolean } from "@/hooks/useBoolean";

import {
  GlobalSnackbarAlertContextType,
  GlobalSnackbarAlertProviderProps,
} from "./GlobalSnackbarAlertProvider.types";

export const GlobalSnackbarAlertContext =
  createContext<GlobalSnackbarAlertContextType>({
    globalSnackbarAlertMessage: "",
    globalSnackbarAlertSeverity: "success",
    globalSnackbarIsOpen: false,
    setGlobalSnackbarAlertMessage: () => {},
    setGlobalSnackbarAlertSeverity: () => {},
    setGlobalSnackbarIsOpenFalse: () => {},
    setGlobalSnackbarIsOpenTrue: () => {},
  });

export const GlobalSnackbarAlertProvider = ({
  children,
}: GlobalSnackbarAlertProviderProps) => {
  const {
    value: globalSnackbarIsOpen,
    setFalse: setGlobalSnackbarIsOpenFalse,
    setTrue: setGlobalSnackbarIsOpenTrue,
  } = useBoolean({ initialValue: false });
  const [globalSnackbarAlertMessage, setGlobalSnackbarAlertMessage] =
    useState<string>("");
  const [globalSnackbarAlertSeverity, setGlobalSnackbarAlertSeverity] =
    useState<"success" | "error">("success");

  return (
    <GlobalSnackbarAlertContext.Provider
      value={{
        globalSnackbarAlertMessage,
        globalSnackbarAlertSeverity,
        globalSnackbarIsOpen,
        setGlobalSnackbarAlertMessage,
        setGlobalSnackbarAlertSeverity,
        setGlobalSnackbarIsOpenFalse,
        setGlobalSnackbarIsOpenTrue,
      }}
    >
      {children}
    </GlobalSnackbarAlertContext.Provider>
  );
};
