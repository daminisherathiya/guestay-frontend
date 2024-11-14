export interface ForgotPasswordDialogProps {
  handleCloseForgotPasswordDialog: () => void;
  handleOpenLoginDialog: () => void;
  isForgotPasswordDialogOpen: boolean;
}

export interface useForgotPasswordDialogProps
  extends ForgotPasswordDialogProps {}
