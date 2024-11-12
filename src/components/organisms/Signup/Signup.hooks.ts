import { useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";

import { signUpApi } from "@/apis/account/signUpApi";
import {
  SignUpAPIResponseType,
  SignUpApiDataType,
  SignUpApiType,
} from "@/apis/account/signUpApi/signUpApi.types";
import { defaultCountry } from "@/components/molecules/CountrySelect/CountrySelect.consts";
import { CountryType } from "@/components/molecules/CountrySelect/CountrySelect.types";
import { useMutation } from "@/hooks/useMutation";

import { UseSignupProps } from "./Signup.types";

export function useSignUp({
  handleCloseSignUp,
  handleOpenLogin,
  isSignUpDialogOpen,
}: UseSignupProps) {
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
      handleCloseSignUp();
      handleOpenLogin();
    }
  }, [handleCloseSignUp, handleOpenLogin, signUpApiIsSuccess]);

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
