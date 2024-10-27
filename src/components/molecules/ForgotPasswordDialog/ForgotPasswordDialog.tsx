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
    handleSubmit,
    isValid,
    onSubmit,
    paswordResetApiIsPending,
    paswordResetApiSnackbarAlert,
    ResetPasswordDialogIsOpen,
    setResetPasswordDialogIsOpenFalse,
  } = useForgotPasswordDialog({
    handleCloseForgotPasswordDialog,
  });

  return (
    <>
      <DialogWrapper
        handleCloseDialog={handleCloseForgotPasswordDialog}
        isDialogOpen={isForgotPasswordDialogOpen}
        maxWidth="xs"
        title="Forgot password?"
      >
        <Typography className="mb-6" component="h3" variant="h3">
          Enter the email associated with your account, and we&apos;ll send a
          temporary password. Use it to create a new password.
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
          <LoadingButton
            className="mt-4 w-full"
            color="secondary"
            disabled={!isValid}
            loading={paswordResetApiIsPending}
            loadingIndicator="Reset ..."
            size="large"
            type="submit"
            variant="contained"
          >
            Send Reset Link
          </LoadingButton>
        </form>
      </DialogWrapper>
      <ResetPasswordDialog
        handleCloseResetPasswordDialog={setResetPasswordDialogIsOpenFalse}
        isResetPasswordDialogOpen={ResetPasswordDialogIsOpen}
      />
      {paswordResetApiSnackbarAlert}
    </>
  );
}
