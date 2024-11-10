export interface LoginDialogProps {
  handleCloseLoginDialog: () => void;
  handleOpenLoginDialog: () => void;
  handleOpenSignUpDialog: () => void;
  isLoginDialogOpen: boolean;
}

export type UseLoginDialogProps = Pick<
  LoginDialogProps,
  "handleCloseLoginDialog" | "isLoginDialogOpen"
>;
