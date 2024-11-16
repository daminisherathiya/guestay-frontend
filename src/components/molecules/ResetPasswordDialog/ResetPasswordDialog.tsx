"use client";

import { Grid2 } from "@/components/atoms/Grid2";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { TextFieldWrapper } from "../TextFieldWrapper";

import { useResetPasswordDialog } from "./ResetPasswordDialog.hooks";
import { ResetPasswordDialogProps } from "./ResetPasswordDialog.types";

export function ResetPasswordDialog({
  handleCloseResetPasswordDialog,
  isResetPasswordDialogOpen,
}: ResetPasswordDialogProps) {
  const {
    changePasswordApiIsPending,
    control,
    handleSubmit,
    isValid,
    onSubmit,
    password,
  } = useResetPasswordDialog({ handleCloseResetPasswordDialog });

  return (
    <>
      <DialogWrapper
        handleCloseDialog={handleCloseResetPasswordDialog}
        isDialogOpen={isResetPasswordDialogOpen}
        maxWidth="xs"
        title="Create new password"
      >
        <Typography className="mb-6" component="h3" variant="h3">
          Your new password must be different from previous used passwords.
        </Typography>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Current Password"
                name="oldPassword"
                rules={{ required: "Current Password is required" }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="New Password"
                name="newPassword"
                rules={{
                  minLength: {
                    message: "Password must be at least 8 characters long",
                    value: 8,
                  },
                  pattern: {
                    message:
                      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/,
                  },
                  required: "Password is required",
                }}
                type="password"
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Confirm Password"
                name="confirmPassword"
                rules={{
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                type="password"
              />
            </Grid2>
          </Grid2>
          <LoadingButton
            className="mt-4 w-full"
            color="secondary"
            disabled={!isValid}
            loading={changePasswordApiIsPending}
            loadingIndicator="Reset ..."
            size="large"
            type="submit"
            variant="contained"
          >
            Reset Password
          </LoadingButton>
        </form>
      </DialogWrapper>
    </>
  );
}
