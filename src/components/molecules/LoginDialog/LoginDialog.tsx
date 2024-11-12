// import AppleIcon from "@mui/icons-material/Apple";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

// import { Box } from "@/components/atoms/Box";
// import { Button } from "@/components/atoms/Button";
// import { Divider } from "@/components/atoms/Divider";
// import { Grid2 } from "@/components/atoms/Grid2";
// import { LoadingButton } from "@/components/atoms/LoadingButton";
// import { Stack } from "@/components/atoms/Stack";
// import { Typography } from "@/components/atoms/Typography";
import { Login } from "@/components/organisms/Login";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
// import { SocialButton } from "../SocialButton";
// import { TextFieldWrapper } from "../TextFieldWrapper/TextFieldWrapper";

// import GoogleIcon from "/public/images/google.svg";

import { LoginDialogProps } from "./LoginDialog.types";

export function LoginDialog({
  handleCloseLoginDialog,
  handleOpenLoginDialog,
  handleOpenSignUpDialog,
  isLoginDialogOpen,
}: LoginDialogProps) {
  return (
    <DialogWrapper
      handleCloseDialog={handleCloseLoginDialog}
      isDialogOpen={isLoginDialogOpen}
      maxWidth="sm"
      title="Login"
    >
      <Login
        handleCloseLogin={handleCloseLoginDialog}
        handleOpenLoginDialog={handleOpenLoginDialog}
        handleOpenSignUp={handleOpenSignUpDialog}
        isLoginDialogOpen={isLoginDialogOpen}
      />
    </DialogWrapper>
  );
}
