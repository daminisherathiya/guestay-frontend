import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { paswordResetApi } from "@/apis/account/paswordResetApi";
import {
  paswordResetApiDataType,
  paswordResetApiResponseType,
  paswordResetApiType,
} from "@/apis/account/paswordResetApi/paswordResetApi.types";
import { useMutation } from "@/hooks/useMutation";

import { useForgotPasswordDialogProps } from "./ForgotPasswordDialog.types";

export function useForgotPasswordDialog({
  handleCloseForgotPasswordDialog,
  handleOpenLoginDialog,
  isForgotPasswordDialogOpen,
}: useForgotPasswordDialogProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!isForgotPasswordDialogOpen) {
      reset();
    }
  }, [isForgotPasswordDialogOpen, reset]);

  ////////

  const {
    mutate: paswordResetApiMutate,
    isPending: paswordResetApiIsPending,
    isSuccess: paswordResetApiIsSuccess,
  } = useMutation<paswordResetApiResponseType, Error, paswordResetApiType>({
    mutationFn: paswordResetApi,
    mutationKey: ["password-reset"],
  });

  const onSubmit = (data: paswordResetApiDataType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    paswordResetApiMutate({ data });
  };

  useEffect(() => {
    if (paswordResetApiIsSuccess) {
      handleCloseForgotPasswordDialog();
      handleOpenLoginDialog();
    }
  }, [
    paswordResetApiIsSuccess,
    handleCloseForgotPasswordDialog,
    handleOpenLoginDialog,
  ]);

  return {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    paswordResetApiIsPending,
  };
}
