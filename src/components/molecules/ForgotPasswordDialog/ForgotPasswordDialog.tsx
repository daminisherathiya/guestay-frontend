import { useForm } from "react-hook-form";

import { Grid2 } from "@/components/atoms/Grid2";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { ResetPasswordDialog } from "../ResetPasswordDialog";
import { TextFieldWrapper } from "../TextFieldWrapper";

import { useForgotPasswordDialog } from "./ForgotPasswordDialog.hooks";
import { ForgotPasswordDialogProps } from "./ForgotPasswordDialog.types";

export function ForgotPasswordDialog({
  handleCloseForgotPasswordDialog,
  isForgotPasswordDialogOpen,
}: ForgotPasswordDialogProps) {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const {
    ResetPasswordDialogIsOpen,
    setResetPasswordDialogIsOpenFalse,
    setResetPasswordDialogIsOpenTrue,
  } = useForgotPasswordDialog();

  const onSubmit = (data: {}) => {
    console.log(data);
  };

  return (
    <>
      <DialogWrapper
        handleCloseDialog={handleCloseForgotPasswordDialog}
        isDialogOpen={isForgotPasswordDialogOpen}
        maxWidth="xs"
        title="Forgot password?"
      >
        <Typography className="mb-6" component="h3" variant="h3">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </Typography>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Email"
                name="email"
                rules={{
                  pattern: {
                    message: "Invalid email address",
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  },
                  required: "Email is required",
                }}
              />
            </Grid2>
          </Grid2>
        </form>
        <LoadingButton
          className="mt-4 w-full"
          color="secondary"
          disabled={!isValid}
          loadingIndicator="Reset ..."
          size="large"
          type="submit"
          variant="contained"
          onClick={() => {
            setResetPasswordDialogIsOpenTrue();
            handleCloseForgotPasswordDialog();
          }}
          // loading={signupAPIIsLoading}
        >
          Send Reset Link
        </LoadingButton>
      </DialogWrapper>
      <ResetPasswordDialog
        handleCloseResetPasswordDialog={setResetPasswordDialogIsOpenFalse}
        isResetPasswordDialogOpen={ResetPasswordDialogIsOpen}
      />
    </>
  );
}
