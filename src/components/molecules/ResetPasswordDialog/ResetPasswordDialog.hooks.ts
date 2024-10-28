import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { changePasswordApi } from "@/apis/account/changePasswordApi";
import { changePasswordApiDataType } from "@/apis/account/changePasswordApi/changePasswordApi.type";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useResetPasswordDialogProps } from "./ResetPasswordDialog.types";

export function useResetPasswordDialog({
  handleCloseResetPasswordDialog,
}: useResetPasswordDialogProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
      userId: "",
    },
    mode: "onChange",
  });

  const password = watch("newPassword");

  useEffect(() => {
    trigger("confirmPassword");
  }, [password, trigger]);

  ////////

  const {
    mutate: changePasswordApiMutate,
    isPending: changePasswordApiIsPending,
    isSuccess: changePasswordApiIsSuccess,
    SnackbarAlert: ChangePasswordApiSnackbarAlert,
  } = useMutation(
    {
      mutationFn: changePasswordApi,
      mutationKey: ["change-password"],
    },
    {
      showSnackbarIsOpenOnSuccess: true,
      successMessage: "Your password has been successfully reset!",
    },
  );

  const onSubmit = (data: changePasswordApiDataType) => {
    changePasswordApiMutate({ data: { ...data, userId: getUserDetails().id } });
  };

  useEffect(() => {
    if (changePasswordApiIsSuccess) {
      handleCloseResetPasswordDialog();
    }
  }, [changePasswordApiIsSuccess, handleCloseResetPasswordDialog]);

  return {
    changePasswordApiIsPending,
    ChangePasswordApiSnackbarAlert,
    control,
    handleSubmit,
    isValid,
    onSubmit,
    password,
  };
}
