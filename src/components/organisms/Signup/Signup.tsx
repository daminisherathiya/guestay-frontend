import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Grid2 } from "@/components/atoms/Grid2";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper";

import { useSignUp } from "./Signup.hooks";
import { SignupProps } from "./Signup.types";

export function Signup({
  handleCloseSignUp,
  handleOpenLogin,
  isSignUpDialogOpen,
}: SignupProps) {
  const {
    control,
    country,
    handleSubmit,
    isValid,
    onSubmit,
    password,
    signUpApiIsPending,
    SignUpApiSnackbarAlert,
  } = useSignUp({
    handleCloseSignUp,
    handleOpenLogin,
    isSignUpDialogOpen,
  });

  return (
    <>
      <Typography className="mb-6" component="h2" variant="h2">
        Welcome to Guestay
      </Typography>
      <Box className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ "2xs": 12, sm: 6 }}>
              <TextFieldWrapper
                control={control}
                label="First Name"
                name="firstName"
                rules={{ required: "First name is required" }}
              />
            </Grid2>
            <Grid2 size={{ "2xs": 12, sm: 6 }}>
              <TextFieldWrapper
                control={control}
                label="Last Name"
                name="lastName"
                rules={{ required: "Last name is required" }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Username"
                name="userName"
                rules={{ required: "Username is required" }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Email"
                name="email"
                rules={{
                  pattern: {
                    message: "Invalid email address",
                    value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  },
                  required: "Email is required",
                }}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Password"
                name="password"
                rules={{
                  minLength: {
                    message: "Password must be at least 8 characters long",
                    value: 8,
                  },
                  // pattern: {
                  //   message:
                  //     "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/,
                  // },
                  required: "Password is required",
                }}
                type="password"
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Confirm Password"
                name="confirmPassword"
                rules={{
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                type="password"
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Country/Region"
                name="country"
                rules={{ required: "Country is required" }}
                type="country-select"
              />
            </Grid2>
            <Grid2 size={12}>
              <TextFieldWrapper
                control={control}
                label="Phone Number"
                name="phoneNumber"
                rules={{
                  pattern: {
                    message: "Enter a number between 1 and 10 digits long",
                    value: /^\d{1,10}$/,
                  },
                  required: "Phone number is required",
                }}
                startAdornment={<span>+{country.phone}</span>}
                type="tel"
              />
            </Grid2>
          </Grid2>
          <LoadingButton
            className="w-full"
            color="secondary"
            disabled={!isValid}
            loading={signUpApiIsPending}
            loadingIndicator="Signing up..."
            size="large"
            type="submit"
            variant="contained"
          >
            Sign Up
          </LoadingButton>
        </form>
        <Stack className="flex-row items-center justify-center gap-1">
          <Typography variant="body2">Already a User? </Typography>
          <Button
            className="min-w-0 p-0 leading-5 text-secondary-main no-underline hover:bg-common-transparent hover:underline"
            variant="text"
            onClick={handleOpenLogin}
          >
            Login
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
      {SignUpApiSnackbarAlert}
    </>
  );
}
