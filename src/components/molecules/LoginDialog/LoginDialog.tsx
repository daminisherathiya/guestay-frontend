import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { Grid2 } from "@/components/atoms/Grid2";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { ForgotPasswordDialog } from "../ForgotPasswordDialog";
import { SocialButton } from "../SocialButton";
import { TextFieldWrapper } from "../TextFieldWrapper/TextFieldWrapper";

import GoogleIcon from "/public/images/google.svg";

import { useLoginDialog } from "./LoginDialog.hooks";
import { LoginDialogProps } from "./LoginDialog.types";

export function LoginDialog({
  handleCloseLoginDialog,
  handleOpenLoginDialog,
  handleOpenSignUpDialog,
  isLoginDialogOpen,
}: LoginDialogProps) {
  const {
    control,
    ForgotPasswordDialogIsOpen,
    handleSubmit,
    isValid,
    logInApiIsPending,
    LogInApiSnackbarAlert,
    onSubmit,
    setForgotPasswordDialogIsOpenFalse,
    setForgotPasswordDialogIsOpenTrue,
  } = useLoginDialog({ handleCloseLoginDialog });

  return (
    <>
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
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <TextFieldWrapper
                  control={control}
                  label="Email"
                  name="email"
                  rules={{ required: "Email is required" }}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextFieldWrapper
                  control={control}
                  label="Password"
                  name="password"
                  rules={{ required: "Password is required" }}
                />
              </Grid2>
            </Grid2>
            <LoadingButton
              className="w-full"
              color="secondary"
              disabled={!isValid}
              loading={logInApiIsPending}
              loadingIndicator="Login ..."
              size="large"
              type="submit"
              variant="contained"
            >
              Login
            </LoadingButton>
          </form>
          <Stack className="flex-row flex-wrap justify-between gap-3">
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
            <Button
              className="min-w-0 p-0 leading-5 text-secondary-main no-underline hover:bg-common-transparent hover:underline"
              variant="text"
              onClick={() => {
                setForgotPasswordDialogIsOpenTrue();
                handleCloseLoginDialog();
              }}
            >
              Forgot password?
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
        {LogInApiSnackbarAlert}
      </DialogWrapper>

      <ForgotPasswordDialog
        handleCloseForgotPasswordDialog={setForgotPasswordDialogIsOpenFalse}
        handleOpenLoginDialog={handleOpenLoginDialog}
        isForgotPasswordDialogOpen={ForgotPasswordDialogIsOpen}
      />
    </>
  );
}
