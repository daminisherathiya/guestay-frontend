"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Grid2 } from "@/components/atoms/Grid2";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { ForgotPasswordDialog } from "@/components/molecules/ForgotPasswordDialog";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper";

import { useLogin } from "./Login.hooks";
import { LoginProps } from "./Login.types";

export function Login({
  handleCloseLogin,
  handleOpenLoginDialog = () => {},
  handleOpenSignUp,
  isLoginDialogOpen,
}: LoginProps) {
  const {
    control,
    forgotPasswordDialogIsOpen,
    handleSubmit,
    isValid,
    logInApiIsPending,
    LogInApiSnackbarAlert,
    onSubmit,
    setForgotPasswordDialogIsOpenTrue,
    setForgotPasswordDialogIsOpenFalse,
  } = useLogin({ handleCloseLogin, isLoginDialogOpen });

  return (
    <>
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
                type="password"
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
              onClick={handleOpenSignUp}
            >
              Sign up
            </Button>
          </Stack>
          <Button
            className="min-w-0 p-0 leading-5 text-secondary-main no-underline hover:bg-common-transparent hover:underline"
            variant="text"
            onClick={setForgotPasswordDialogIsOpenTrue}
          >
            Forgot password?
          </Button>
        </Stack>
        {/* <Divider className="text-xs">Or</Divider>
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
        /> */}
      </Box>
      <ForgotPasswordDialog
        handleCloseForgotPasswordDialog={setForgotPasswordDialogIsOpenFalse}
        handleOpenLoginDialog={handleOpenLoginDialog}
        isForgotPasswordDialogOpen={forgotPasswordDialogIsOpen}
      />
      {LogInApiSnackbarAlert}
    </>
  );
}
