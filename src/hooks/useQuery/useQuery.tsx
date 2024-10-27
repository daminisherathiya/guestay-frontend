import React, { useEffect, useState } from "react";

import {
  UseQueryOptions,
  UseQueryResult,
  useQuery as useQueryFromReactQuery,
} from "@tanstack/react-query";

import { SnackbarAlert as SnackbarAlertComponent } from "@/components/molecules/SnackbarAlert";
import { ReactQueryCustomOptionsType } from "@/types/ReactQuery.types";

export function useQuery<TQueryFnData, TError extends Error, TData>(
  useQueryOptions: UseQueryOptions<TQueryFnData, TError, TData>,
  customOptions?: ReactQueryCustomOptionsType,
): UseQueryResult<TData, TError> & { SnackbarAlert: JSX.Element } & {
  isFirstLoading: boolean;
} {
  const {
    showSnackbarIsOpenOnSuccess = false,
    showSnackbarIsOpenOnFailure = true,
    successMessage = "",
  } = customOptions || {};

  const mergedQueryOptions = {
    refetchOnWindowFocus: false,
    ...useQueryOptions,
  };

  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success",
  );

  const queryResult = useQueryFromReactQuery(mergedQueryOptions);

  useEffect(() => {
    if (queryResult.isSuccess && showSnackbarIsOpenOnSuccess) {
      setSnackbarIsOpen(true);
      // setAlertMessage(JSON.stringify(queryResult.data));
      setAlertMessage(successMessage);
      setAlertSeverity("success");
    } else if (queryResult.isError && showSnackbarIsOpenOnFailure) {
      setSnackbarIsOpen(true);
      setAlertMessage(
        queryResult.error instanceof Error
          ? queryResult.error.message
          : "An unknown error occurred",
      );
      setAlertSeverity("error");
    }
  }, [
    queryResult.data,
    queryResult.error,
    queryResult.isError,
    queryResult.isSuccess,
    showSnackbarIsOpenOnFailure,
    showSnackbarIsOpenOnSuccess,
    successMessage,
  ]);

  const SnackbarAlert = (
    <SnackbarAlertComponent
      alertMessage={alertMessage}
      alertSeverity={alertSeverity}
      setSnackbarIsOpen={setSnackbarIsOpen}
      snackbarIsOpen={snackbarIsOpen}
    />
  );

  // isLoading is always false when initialData is passed. This is an alternative of that.
  const isFirstLoading = !queryResult.isFetched && queryResult.isFetching;

  return {
    ...queryResult,
    isFirstLoading,
    SnackbarAlert,
  };
}
