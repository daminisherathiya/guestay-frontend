import { useEffect } from "react";

import { logOutApi } from "@/apis/account/logOutApi";
import {
  LogOutAPIResponseType,
  LogOutApiType,
} from "@/apis/account/logOutApi/logOutApi.types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useLogout() {
  const { handleLogOut } = useAuthentication();

  const {
    mutate: logOutApiMutate,
    isPending: logOutApiIsPending,
    isSuccess: logOutApiIsSuccess,
    SnackbarAlert: LogOutApiSnackbarAlert,
  } = useMutation<LogOutAPIResponseType, Error, LogOutApiType>({
    mutationFn: logOutApi,
    mutationKey: ["logout"],
  });

  const onSubmit = () => {
    logOutApiMutate({ data: { userId: getUserDetails().id } });
  };

  useEffect(() => {
    if (logOutApiIsSuccess) {
      handleLogOut();
    }
  }, [handleLogOut, logOutApiIsSuccess]);

  return { logOutApiIsPending, LogOutApiSnackbarAlert, onSubmit };
}
