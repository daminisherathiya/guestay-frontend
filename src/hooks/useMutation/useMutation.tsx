"use client";

import { useEffect, useState } from "react";

import {
  UseMutationOptions,
  UseMutationResult,
  useMutation as useMutationFromReactQuery,
} from "@tanstack/react-query";

import { SnackbarAlert as SnackbarAlertComponent } from "@/components/molecules/SnackbarAlert";
import { ReactQueryCustomOptionsType } from "@/types/ReactQuery.types";

import { useBoolean } from "../useBoolean";

export function useMutation<
  TData,
  TError extends Error,
  TVariables,
  TContext = unknown,
>(
  mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>,
  customOptions?: ReactQueryCustomOptionsType,
): UseMutationResult<TData, TError, TVariables, TContext> & {
  SnackbarAlert: JSX.Element;
} {
  const {
    showSnackbarIsOpenOnSuccess = false,
    showSnackbarIsOpenOnFailure = true,
    successMessage = "",
  } = customOptions || {};

  const {
    value: snackbarIsOpen,
    setTrue: setSnackbarIsOpenTrue,
    setFalse: setSnackbarIsOpenFalse,
  } = useBoolean({ initialValue: false });
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success",
  );

  const mutationResult = useMutationFromReactQuery(mutationOptions);

  useEffect(() => {
    if (mutationResult.isSuccess && showSnackbarIsOpenOnSuccess) {
      setSnackbarIsOpenTrue();
      // setAlertMessage(JSON.stringify(mutationResult.data));
      setAlertMessage(successMessage);
      setAlertSeverity("success");
    } else if (mutationResult.isError && showSnackbarIsOpenOnFailure) {
      setSnackbarIsOpenTrue();
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
    setSnackbarIsOpenTrue,
    showSnackbarIsOpenOnSuccess,
    showSnackbarIsOpenOnFailure,
    successMessage,
  ]);

  const SnackbarAlert = (
    <SnackbarAlertComponent
      alertMessage={alertMessage}
      alertSeverity={alertSeverity}
      setSnackbarIsOpenFalse={setSnackbarIsOpenFalse}
      snackbarIsOpen={snackbarIsOpen}
    />
  );

  return {
    ...mutationResult,
    SnackbarAlert,
  };
}
