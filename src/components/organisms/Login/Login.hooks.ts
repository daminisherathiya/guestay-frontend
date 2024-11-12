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

import { UseLoginProps } from "./Login.types";

export function useLogin({
  handleCloseLogin,
  isLoginDialogOpen,
}: UseLoginProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!isLoginDialogOpen) {
      reset();
    }
  }, [isLoginDialogOpen, reset]);

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
      handleCloseLogin();
      handleLogIn({
        authenticationToken: logInApiData.data.auth_token,
        userDetails: logInApiData.data.userData,
      });
    }
  }, [handleCloseLogin, handleLogIn, logInApiIsSuccess, logInApiData]);

  const {
    value: forgotPasswordDialogIsOpen,
    setTrue: setForgotPasswordDialogIsOpenTrue,
    setFalse: setForgotPasswordDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  return {
    control,
    forgotPasswordDialogIsOpen,
    handleSubmit,
    isValid,
    logInApiIsPending,
    LogInApiSnackbarAlert,
    onSubmit,
    setForgotPasswordDialogIsOpenFalse,
    setForgotPasswordDialogIsOpenTrue,
  };
}
