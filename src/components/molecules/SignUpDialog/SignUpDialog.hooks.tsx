import { useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";

import { signUpApi } from "@/apis/account/signUpApi";
import {
  SignUpAPIResponseType,
  SignUpApiDataType,
  SignUpApiType,
} from "@/apis/account/signUpApi/signUpApi.types";
import { useMutation } from "@/hooks/useMutation";

import { defaultCountry } from "../CountrySelect/CountrySelect.consts";
import { CountryType } from "../CountrySelect/CountrySelect.types";

import { UseSignUpDialogProps } from "./SignUpDialog.types";

export function useSignUpDialog({
  handleCloseSignUpDialog,
  handleOpenLoginDialog,
  isSignUpDialogOpen,
}: UseSignUpDialogProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      confirmPassword: "",
      country: defaultCountry,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      profilePicture: "",
      userName: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!isSignUpDialogOpen) {
      reset();
    }
  }, [isSignUpDialogOpen, reset]);

  const country = watch("country");
  const password = watch("password");

  useEffect(() => {
    trigger("confirmPassword");
  }, [password, trigger]);

  ////////

  const {
    mutate: signUpApiMutate,
    isPending: signUpApiIsPending,
    isSuccess: signUpApiIsSuccess,
    SnackbarAlert: SignUpApiSnackbarAlert,
  } = useMutation<SignUpAPIResponseType, Error, SignUpApiType>({
    mutationFn: signUpApi,
    mutationKey: ["sign-up"],
  });

  const onSubmit = useCallback(
    (
      data: Omit<SignUpApiDataType, "countryCode"> & {
        country: CountryType;
      },
    ) => {
      signUpApiMutate({
        data: { ...data, countryCode: country.phone },
      });
    },
    [country.phone, signUpApiMutate],
  );

  useEffect(() => {
    if (signUpApiIsSuccess) {
      handleCloseSignUpDialog();
      handleOpenLoginDialog();
    }
  }, [handleCloseSignUpDialog, handleOpenLoginDialog, signUpApiIsSuccess]);

  return {
    control,
    country,
    handleSubmit,
    isValid,
    onSubmit,
    password,
    signUpApiIsPending,
    signUpApiIsSuccess,
    SignUpApiSnackbarAlert,
  };
}
