import { useEffect } from "react";

import {
  UseQueryOptions,
  UseQueryResult,
  useQuery as useQueryFromReactQuery,
} from "@tanstack/react-query";

import { ReactQueryCustomOptionsType } from "@/types/ReactQuery.types";

import { useAuthentication } from "../useAuthentication";
import { useGlobalSnackbarAlert } from "../useGlobalSnackbarAlert";

export function useQuery<TQueryFnData, TError extends Error, TData>(
  useQueryOptions: UseQueryOptions<TQueryFnData, TError, TData>,
  customOptions?: ReactQueryCustomOptionsType,
): UseQueryResult<TData, TError> & {
  isFirstLoading: boolean;
} {
  const { handleLogOut } = useAuthentication();

  const {
    showSnackbarIsOpenOnSuccess = false,
    showSnackbarIsOpenOnFailure = true,
    successMessage = "",
  } = customOptions || {};

  const mergedQueryOptions = {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 0,
    ...useQueryOptions,
  };

  const {
    setGlobalSnackbarAlertMessage,
    setGlobalSnackbarAlertSeverity,
    setGlobalSnackbarIsOpenTrue,
  } = useGlobalSnackbarAlert();

  const queryResult = useQueryFromReactQuery(mergedQueryOptions);

  useEffect(() => {
    if (queryResult.isSuccess && showSnackbarIsOpenOnSuccess) {
      setGlobalSnackbarIsOpenTrue();
      // setAlertMessage(JSON.stringify(queryResult.data));
      setGlobalSnackbarAlertMessage(successMessage);
      setGlobalSnackbarAlertSeverity("success");
    } else if (queryResult.isError && showSnackbarIsOpenOnFailure) {
      setGlobalSnackbarIsOpenTrue();
      setGlobalSnackbarAlertMessage(
        queryResult.error instanceof Error
          ? queryResult.error.message
          : "An unknown error occurred",
      );
      setGlobalSnackbarAlertSeverity("error");
    }

    if (
      queryResult.isError &&
      queryResult.error.message.includes("Authorization token not verified.")
    ) {
      handleLogOut();
    }
  }, [
    handleLogOut,
    queryResult.data,
    queryResult.error,
    queryResult.isError,
    queryResult.isSuccess,
    setGlobalSnackbarAlertMessage,
    setGlobalSnackbarAlertSeverity,
    setGlobalSnackbarIsOpenTrue,
    showSnackbarIsOpenOnFailure,
    showSnackbarIsOpenOnSuccess,
    successMessage,
  ]);

  // isLoading is always false when initialData is passed. This is an alternative of that.
  const isFirstLoading = !queryResult.isFetched && queryResult.isFetching;

  return {
    ...queryResult,
    isFirstLoading,
  };
}
