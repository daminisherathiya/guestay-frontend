import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { SocialButton } from "../SocialButton";
import { TextFieldWrapper } from "../TextFieldWrapper/TextFieldWrapper";

import GoogleIcon from "/public/images/google.svg";

import { loginTextFields } from "./LoginDialog.consts";
import { useLoginDialog } from "./LoginDialog.hooks";
import { LoginDialogProps } from "./LoginDialog.types";

export function LoginDialog({
  handleCloseLoginDialog,
  handleOpenSignUpDialog,
  isLoginDialogOpen,
}: LoginDialogProps) {
  const { focusedInputIndex, setFocusedInputIndex } = useLoginDialog();

  return (
    <DialogWrapper
      handleCloseDialog={handleCloseLoginDialog}
      isDialogOpen={isLoginDialogOpen}
      maxWidth="sm"
      title="Login"
    >
      <Typography className="mb-6" component="h2" variant="h2">
        Welcome back
      </Typography>
      <Box className="space-y-4">
        <Box>
          {loginTextFields.map((loginTextField, index) => (
            <TextFieldWrapper
              key={loginTextField.key}
              focusedInputIndex={focusedInputIndex}
              handleBlur={() => setFocusedInputIndex(null)}
              handleFocus={() => setFocusedInputIndex(index)}
              index={index}
              label={loginTextField.label}
              totalFields={loginTextFields.length}
              type={loginTextField.type}
              value=""
            />
          ))}
        </Box>
        <Button
          className="w-full text-common-white"
          color="secondary"
          size="large"
          variant="contained"
        >
          Login
        </Button>
        <Stack className="flex-row items-center justify-center gap-1">
          <Typography variant="body2">Are you a new User? </Typography>
          <Button
            className="min-w-0 p-0 leading-5 text-secondary-main no-underline hover:bg-common-transparent hover:underline"
            variant="text"
            onClick={handleOpenSignUpDialog}
          >
            Sign up
          </Button>
        </Stack>
        <Divider className="text-xs">Or</Divider>
        <SocialButton
          icon={<FacebookIcon className="text-facebook" />}
          label="Continue with Facebook"
        />
        <SocialButton
          icon={<GoogleIcon className="!size-6" />}
          label="Continue with Google"
        />
        <SocialButton icon={<AppleIcon />} label="Continue with Apple" />
        <SocialButton
          icon={<MailOutlineOutlinedIcon />}
          label="Continue with email"
        />
      </Box>
    </DialogWrapper>
  );
}
