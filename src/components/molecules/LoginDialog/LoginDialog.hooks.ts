import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { loginApi } from "@/apis/account/loginApi";
import {
  LogInAPIResponseType,
  LoginApiDataType,
  LoginApiType,
} from "@/apis/account/loginApi/loginApi.types";
import { useBoolean } from "@/hooks/useBoolean";
import { useMutation } from "@/hooks/useMutation";
import {
  setAuthenticationToken,
  setUserDetails,
} from "@/utils/localStorage/localStorage";

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

  const {
    data: logInApiData,
    mutate: logInApiMutate,
    isPending: logInApiIsPending,
    isSuccess: logInApiIsSuccess,
    SnackbarAlert: LogInApiSnackbarAlert,
  } = useMutation<LogInAPIResponseType, Error, LoginApiType>({
    mutationFn: loginApi,
    mutationKey: ["login"],
  });

  const onSubmit = (data: LoginApiDataType) => {
    logInApiMutate({ data });
  };

  useEffect(() => {
    if (logInApiIsSuccess) {
      handleCloseLoginDialog();
      setAuthenticationToken({
        authenticationToken: logInApiData.data.auth_token,
      });
      setUserDetails({ userDetails: logInApiData.data.userData });
    }
  }, [handleCloseLoginDialog, logInApiIsSuccess, logInApiData]);

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
