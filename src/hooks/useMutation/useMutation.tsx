"use client";

import React, { useEffect, useState } from "react";

import {
  UseMutationOptions,
  UseMutationResult,
  useMutation as useMutationFromReactQuery,
} from "@tanstack/react-query";

import { SnackbarAlert as SnackbarAlertComponent } from "@/components/molecules/SnackbarAlert";
import { ReactQueryCustomOptionsType } from "@/types/ReactQuery.types";

export function useMutation<TData, TError extends Error, TVariables, TContext>(
  mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>,
  customOptions?: ReactQueryCustomOptionsType,
): UseMutationResult<TData, TError, TVariables, TContext> & {
  SnackbarAlert: JSX.Element;
} {
  const {
    showSnackbarIsOpenOnSuccess = false,
    showSnackbarIsOpenOnFailure = true,
  } = customOptions || {};

  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success",
  );

  const mutationResult = useMutationFromReactQuery(mutationOptions);

  useEffect(() => {
    if (mutationResult.isSuccess && showSnackbarIsOpenOnSuccess) {
      setSnackbarIsOpen(true);
      setAlertMessage(JSON.stringify(mutationResult.data));
      setAlertSeverity("success");
    } else if (mutationResult.isError && showSnackbarIsOpenOnFailure) {
      setSnackbarIsOpen(true);
      setAlertMessage(
        mutationResult.error instanceof Error
          ? mutationResult.error.message
          : "An unknown error occurred",
      );
      setAlertSeverity("error");
    }
  }, [
    mutationResult.data,
    mutationResult.error,
    mutationResult.isError,
    mutationResult.isSuccess,
    showSnackbarIsOpenOnSuccess,
    showSnackbarIsOpenOnFailure,
  ]);

  const SnackbarAlert = (
    <SnackbarAlertComponent
      alertMessage={alertMessage}
      alertSeverity={alertSeverity}
      setSnackbarIsOpen={setSnackbarIsOpen}
      snackbarIsOpen={snackbarIsOpen}
    />
  );

  return {
    ...mutationResult,
    SnackbarAlert,
  };
}
