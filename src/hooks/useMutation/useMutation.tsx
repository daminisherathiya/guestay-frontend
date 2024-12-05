"use client";

import { useEffect } from "react";

import {
  UseMutationOptions,
  UseMutationResult,
  useMutation as useMutationFromReactQuery,
} from "@tanstack/react-query";

import { ReactQueryCustomOptionsType } from "@/types/ReactQuery.types";

import { useGlobalSnackbarAlert } from "../useGlobalSnackbarAlert";

export function useMutation<
  TData,
  TError extends Error,
  TVariables,
  TContext = unknown,
>(
  mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>,
  customOptions?: ReactQueryCustomOptionsType,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const {
    showSnackbarIsOpenOnSuccess = false,
    showSnackbarIsOpenOnFailure = true,
    successMessage = "",
  } = customOptions || {};

  const {
    setGlobalSnackbarAlertIsOpenTrue,
    setGlobalSnackbarAlertMessage,
    setGlobalSnackbarAlertResetCounter,
    setGlobalSnackbarAlertSeverity,
  } = useGlobalSnackbarAlert();

  const mutationResult = useMutationFromReactQuery(mutationOptions);

  useEffect(() => {
    if (mutationResult.isSuccess && showSnackbarIsOpenOnSuccess) {
      setGlobalSnackbarAlertIsOpenTrue();
      // setAlertMessage(JSON.stringify(mutationResult.data));
      setGlobalSnackbarAlertMessage(successMessage);
      setGlobalSnackbarAlertSeverity("success");
      setGlobalSnackbarAlertResetCounter((count) => count + 1);
    } else if (mutationResult.isError && showSnackbarIsOpenOnFailure) {
      setGlobalSnackbarAlertIsOpenTrue();
      setGlobalSnackbarAlertMessage(
        mutationResult.error instanceof Error
          ? mutationResult.error.message
          : "An unknown error occurred",
      );
      setGlobalSnackbarAlertSeverity("error");
      setGlobalSnackbarAlertResetCounter((count) => count + 1);
    }
  }, [
    mutationResult.data,
    mutationResult.error,
    mutationResult.isError,
    mutationResult.isSuccess,
    setGlobalSnackbarAlertMessage,
    setGlobalSnackbarAlertResetCounter,
    setGlobalSnackbarAlertSeverity,
    setGlobalSnackbarAlertIsOpenTrue,
    showSnackbarIsOpenOnSuccess,
    showSnackbarIsOpenOnFailure,
    successMessage,
  ]);

  return {
    ...mutationResult,
  };
}
