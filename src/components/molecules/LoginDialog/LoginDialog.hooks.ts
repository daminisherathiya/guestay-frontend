import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { logInApi } from "@/apis/account/loginApi";
import {
  LogInAPIResponseType,
  LogInApiDataType,
  LogInApiType,
} from "@/apis/account/loginApi/loginApi.types";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useBoolean } from "@/hooks/useBoolean";
import { useMutation } from "@/hooks/useMutation";
import { setUserDetails } from "@/utils/localStorage/localStorage";

import { UseLoginDialogProps } from "./LoginDialog.types";

export function useLoginDialog({
  handleCloseLoginDialog,
}: UseLoginDialogProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "damini.sherathiya",
      password: "Damini@123",
    },
    mode: "onChange",
  });

  ////////

  const { handleLogIn } = useAuthentication();

  const {
    data: logInApiData,
    mutate: logInApiMutate,
    isPending: logInApiIsPending,
    isSuccess: logInApiIsSuccess,
    SnackbarAlert: LogInApiSnackbarAlert,
  } = useMutation<LogInAPIResponseType, Error, LogInApiType>({
    mutationFn: logInApi,
    mutationKey: ["login"],
  });

  const onSubmit = (data: LogInApiDataType) => {
    logInApiMutate({ data });
  };

  useEffect(() => {
    if (logInApiIsSuccess) {
      handleCloseLoginDialog();
      handleLogIn({
        authenticationToken: logInApiData.data.auth_token,
      });
      setUserDetails({ userDetails: logInApiData.data.userData });
    }
  }, [handleCloseLoginDialog, handleLogIn, logInApiIsSuccess, logInApiData]);

  const {
    value: ForgotPasswordDialogIsOpen,
    setTrue: setForgotPasswordDialogIsOpenTrue,
    setFalse: setForgotPasswordDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  return {
    control,
    ForgotPasswordDialogIsOpen,
    handleSubmit,
    isValid,
    logInApiIsPending,
    LogInApiSnackbarAlert,
    onSubmit,
    setForgotPasswordDialogIsOpenFalse,
    setForgotPasswordDialogIsOpenTrue,
  };
}
