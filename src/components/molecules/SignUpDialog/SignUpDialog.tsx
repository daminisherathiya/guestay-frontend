import { useState } from "react";

import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Divider } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import GoogleIcon from "/public/images/google.svg";

import DialogWrapper from "../DialogWrapper/DialogWrapper";
import TextFieldWrapper from "../TextFieldWrapper/TextFieldWrapper";

interface SignUpDialogProps {
  handleCloseSignUpDialog: () => void;
  handleOpenLoginDialog: () => void;
  isSignUpDialogOpen: boolean;
}

const signUpTextFields = [
  { key: "fname", label: "First Name", type: "text" },
  { key: "lname", label: "Last Name", type: "text" },
  { key: "uname", label: "Username", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "password", label: "Password", type: "password" },
  { key: "confirm_password", label: "Confirm Password", type: "password" },
  { key: "country_code", label: "Country/region", type: "country-select" },
  { key: "phone", label: "Phone Number", startAdornment: "+91", type: "tel" },
];

interface SocialButtonProps {
  className?: string;
  icon: React.ReactNode;
  label: string;
  // onClick: () => void;
}

function SocialButton({ className, icon, label, onClick }: SocialButtonProps) {
  return (
    <Button
      className={`w-full justify-between border-common-black/45 text-sm ${className}`}
      size="large"
      variant="outlined"
      // onClick={onClick}
    >
      {icon}
      {label}
      <div></div> {/* Placeholder for maintaining button structure */}
    </Button>
  );
}

export default function SignUpDialog({
  handleCloseSignUpDialog,
  handleOpenLoginDialog,
  isSignUpDialogOpen,
}: SignUpDialogProps) {
  const [focusedInputIndex, setFocusedInputIndex] = useState<null | number>(
    null,
  );

  return (
    <DialogWrapper
      handleCloseDialog={handleCloseSignUpDialog}
      isDialogOpen={isSignUpDialogOpen}
      maxWidth="sm"
      title="Sign up"
    >
      <Typography className="mb-6" component="h2" variant="h2">
        Welcome to Airbnb
      </Typography>
      <Box className="space-y-4">
        <Box>
          {signUpTextFields.map((signUpTextField, index) => (
            <TextFieldWrapper
              key={signUpTextField.key}
              focusedInputIndex={focusedInputIndex}
              handleBlur={() => setFocusedInputIndex(null)}
              handleFocus={() => setFocusedInputIndex(index)}
              index={index}
              label={signUpTextField.label}
              startAdornment={
                signUpTextField.startAdornment
                  ? signUpTextField.startAdornment
                  : undefined
              }
              totalFields={signUpTextFields.length}
              type={signUpTextField.type}
            />
          ))}
        </Box>
        <Button
          className="w-full text-common-white"
          color="secondary"
          size="large"
          variant="contained"
        >
          Sign Up
        </Button>
        <Stack className="flex-row items-center justify-center gap-1">
          <Typography variant="body2">Already a User? </Typography>
          <Button
            className="min-w-0 p-0 leading-5 text-secondary-main no-underline hover:bg-common-transparent hover:underline"
            variant="text"
            onClick={handleOpenLoginDialog}
          >
            Login
          </Button>
        </Stack>
        <Divider className="text-xs">Or</Divider>
        <SocialButton
          icon={<FacebookIcon className="text-[#1877F2]" />}
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
