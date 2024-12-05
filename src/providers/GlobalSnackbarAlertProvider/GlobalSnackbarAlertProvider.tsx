"use client";

import React, { createContext, useState } from "react";

import { useBoolean } from "@/hooks/useBoolean";

import {
  GlobalSnackbarAlertContextType,
  GlobalSnackbarAlertProviderProps,
} from "./GlobalSnackbarAlertProvider.types";

export const GlobalSnackbarAlertContext =
  createContext<GlobalSnackbarAlertContextType>({
    globalSnackbarAlertIsOpen: false,
    globalSnackbarAlertMessage: "",
    globalSnackbarAlertResetCounter: 0,
    globalSnackbarAlertSeverity: "success",
    setGlobalSnackbarAlertIsOpenFalse: () => {},
    setGlobalSnackbarAlertIsOpenTrue: () => {},
    setGlobalSnackbarAlertMessage: () => {},
    setGlobalSnackbarAlertResetCounter: () => {},
    setGlobalSnackbarAlertSeverity: () => {},
  });

export const GlobalSnackbarAlertProvider = ({
  children,
}: GlobalSnackbarAlertProviderProps) => {
  const {
    value: globalSnackbarAlertIsOpen,
    setFalse: setGlobalSnackbarAlertIsOpenFalse,
    setTrue: setGlobalSnackbarAlertIsOpenTrue,
  } = useBoolean({ initialValue: false });
  const [globalSnackbarAlertMessage, setGlobalSnackbarAlertMessage] =
    useState<string>("");
  const [globalSnackbarAlertSeverity, setGlobalSnackbarAlertSeverity] =
    useState<"success" | "error">("success");
  const [globalSnackbarAlertResetCounter, setGlobalSnackbarAlertResetCounter] =
    useState<number>(0);

  return (
    <GlobalSnackbarAlertContext.Provider
      value={{
        globalSnackbarAlertIsOpen,
        globalSnackbarAlertMessage,
        globalSnackbarAlertResetCounter,
        globalSnackbarAlertSeverity,
        setGlobalSnackbarAlertIsOpenFalse,
        setGlobalSnackbarAlertIsOpenTrue,
        setGlobalSnackbarAlertMessage,
        setGlobalSnackbarAlertResetCounter,
        setGlobalSnackbarAlertSeverity,
      }}
    >
      {children}
    </GlobalSnackbarAlertContext.Provider>
  );
};
