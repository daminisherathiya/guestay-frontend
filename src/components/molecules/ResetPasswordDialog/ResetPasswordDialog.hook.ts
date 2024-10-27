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
      confirmPassword: "Damini@123",
      newPassword: "Damini@123",
      oldPassword: "",
      userId: getUserDetails().id,
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
    SnackbarAlert: changePasswordApiSnackbarAlert,
  } = useMutation(
    {
      mutationFn: changePasswordApi,
      mutationKey: ["change-password"],
    },
    {
      showSnackbarIsOpenOnSuccess: true,
    },
  );

  const onSubmit = (data: changePasswordApiDataType) => {
    changePasswordApiMutate({ data });
  };

  useEffect(() => {
    if (changePasswordApiIsSuccess) {
      handleCloseResetPasswordDialog();
    }
  });

  return {
    changePasswordApiIsPending,
    changePasswordApiSnackbarAlert,
    control,
    handleSubmit,
    isValid,
    onSubmit,
    password,
  };
}
