import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { ResetPasswordDialog } from "../ResetPasswordDialog";
import { TextFieldWrapper } from "../TextFieldWrapper";

import { forgotPasswordTextFields } from "./ForgotPasswordDialog.consts";
import { useForgotPasswordDialog } from "./ForgotPasswordDialog.hooks";
import { ForgotPasswordDialogProps } from "./ForgotPasswordDialog.types";

export function ForgotPasswordDialog({
  handleCloseForgotPasswordDialog,
  isForgotPasswordDialogOpen,
}: ForgotPasswordDialogProps) {
  const {
    focusedInputIndex,
    ResetPasswordDialogIsOpen,
    setFocusedInputIndex,
    setResetPasswordDialogIsOpenFalse,
    setResetPasswordDialogIsOpenTrue,
  } = useForgotPasswordDialog();

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
        {forgotPasswordTextFields.map((forgotPasswordTextField, index) => (
          <TextFieldWrapper
            key={forgotPasswordTextField.key}
            focusedInputIndex={focusedInputIndex}
            handleBlur={() => setFocusedInputIndex(null)}
            handleFocus={() => setFocusedInputIndex(index)}
            index={index}
            label={forgotPasswordTextField.label}
            totalFields={forgotPasswordTextFields.length}
            type={forgotPasswordTextField.type}
            value=""
          />
        ))}
        <Button
          className="mt-4 w-full text-common-white"
          color="secondary"
          size="large"
          variant="contained"
          onClick={() => {
            setResetPasswordDialogIsOpenTrue();
            handleCloseForgotPasswordDialog();
          }}
        >
          Send Reset Link
        </Button>
      </DialogWrapper>
      <ResetPasswordDialog
        handleCloseResetPasswordDialog={setResetPasswordDialogIsOpenFalse}
        isResetPasswordDialogOpen={ResetPasswordDialogIsOpen}
      />
    </>
  );
}
