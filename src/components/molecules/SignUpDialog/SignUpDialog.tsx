import { Signup } from "@/components/organisms/Signup";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";

import { SignUpDialogProps } from "./SignUpDialog.types";

export function SignUpDialog({
  handleCloseSignUpDialog,
  handleOpenLoginDialog,
  isSignUpDialogOpen,
}: SignUpDialogProps) {
  return (
    <>
      <DialogWrapper
        handleCloseDialog={handleCloseSignUpDialog}
        isDialogOpen={isSignUpDialogOpen}
        maxWidth="sm"
        title="Sign up"
      >
        <Signup
          handleCloseSignUp={handleCloseSignUpDialog}
          handleOpenLogin={handleOpenLoginDialog}
          isSignUpDialogOpen={isSignUpDialogOpen}
        />
      </DialogWrapper>
    </>
  );
}
