export interface LoginProps {
  handleCloseLogin: () => void;
  handleOpenLoginDialog?: () => void;
  handleOpenSignUp: () => void;
  isLoginDialogOpen: boolean;
}

export type UseLoginProps = Pick<
  LoginProps,
  "handleCloseLogin" | "isLoginDialogOpen"
>;
