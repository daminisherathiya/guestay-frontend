export interface LoginDialogProps {
  handleCloseLoginDialog: () => void;
  handleOpenSignUpDialog: () => void;
  isLoginDialogOpen: boolean;
}

export type UseLoginDialogProps = Pick<
  LoginDialogProps,
  "handleCloseLoginDialog"
>;
