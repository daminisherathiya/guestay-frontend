import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { TextFieldWrapper } from "../TextFieldWrapper";

import { ResetPasswordTextFields } from "./ResetPasswordDialog.consts";
import { useResetPasswordDialog } from "./ResetPasswordDialog.hooks";
import { ResetPasswordDialogProps } from "./ResetPasswordDialog.types";

export function ResetPasswordDialog({
  handleCloseResetPasswordDialog,
  isResetPasswordDialogOpen,
}: ResetPasswordDialogProps) {
  const { focusedInputIndex, setFocusedInputIndex } = useResetPasswordDialog();

  return (
    <DialogWrapper
      handleCloseDialog={handleCloseResetPasswordDialog}
      isDialogOpen={isResetPasswordDialogOpen}
      maxWidth="xs"
      title="Create new password"
    >
      <Typography className="mb-6" component="h3" variant="h3">
        Your new password must be different from previous used passwords.
      </Typography>
      {ResetPasswordTextFields.map((ResetPasswordTextField, index) => (
        <TextFieldWrapper
          key={ResetPasswordTextField.key}
          focusedInputIndex={focusedInputIndex}
          handleBlur={() => setFocusedInputIndex(null)}
          handleFocus={() => setFocusedInputIndex(index)}
          index={index}
          label={ResetPasswordTextField.label}
          totalFields={ResetPasswordTextFields.length}
          type={ResetPasswordTextField.type}
          value=""
        />
      ))}
      <Button
        className="mt-4 w-full text-common-white"
        color="secondary"
        size="large"
        variant="contained"
      >
        Reset Password
      </Button>
    </DialogWrapper>
  );
}
