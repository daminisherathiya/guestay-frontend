export interface SignUpDialogProps {
  handleCloseSignUpDialog: () => void;
  handleOpenLoginDialog: () => void;
  isSignUpDialogOpen: boolean;
}

export type UseSignUpDialogProps = SignUpDialogProps;
