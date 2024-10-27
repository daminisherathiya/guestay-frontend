import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { paswordResetApi } from "@/apis/account/paswordResetApi";
import {
  paswordResetApiDataType,
  paswordResetApiResponseType,
  paswordResetApiType,
} from "@/apis/account/paswordResetApi/paswordResetApi.types";
import { useBoolean } from "@/hooks/useBoolean";
import { useMutation } from "@/hooks/useMutation";

import { useForgotPasswordDialogProps } from "./ForgotPasswordDialog.types";

export function useForgotPasswordDialog({
  handleCloseForgotPasswordDialog,
}: useForgotPasswordDialogProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "daminisherathiya@gmail.com",
    },
    mode: "onChange",
  });

  ////////

  const {
    mutate: paswordResetApiMutate,
    isPending: paswordResetApiIsPending,
    isSuccess: paswordResetApiIsSuccess,
    SnackbarAlert: paswordResetApiSnackbarAlert,
  } = useMutation<paswordResetApiResponseType, Error, paswordResetApiType>({
    mutationFn: paswordResetApi,
    mutationKey: ["password-reset"],
  });

  const onSubmit = (data: paswordResetApiDataType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    paswordResetApiMutate({ data });
  };

  const {
    value: ResetPasswordDialogIsOpen,
    setTrue: setResetPasswordDialogIsOpenTrue,
    setFalse: setResetPasswordDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  useEffect(() => {
    if (paswordResetApiIsSuccess) {
      handleCloseForgotPasswordDialog();
      setResetPasswordDialogIsOpenTrue();
    }
  }, [
    paswordResetApiIsSuccess,
    handleCloseForgotPasswordDialog,
    setResetPasswordDialogIsOpenTrue,
  ]);

  return {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    paswordResetApiIsPending,
    paswordResetApiSnackbarAlert,
    ResetPasswordDialogIsOpen,
    setResetPasswordDialogIsOpenFalse,
  };
}
