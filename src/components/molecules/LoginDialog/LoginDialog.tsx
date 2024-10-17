import { useState } from "react";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { TextFieldWrapper } from "../TextFieldWrapper/TextFieldWrapper";

interface LoginDialogProps {
  handleCloseLoginDialog: () => void;
  handleOpenSignUpDialog: () => void;
  isLoginDialogOpen: boolean;
}

const loginTextFields = [
  { key: "uname", label: "Username", type: "text" },
  { key: "password", label: "Password", type: "password" },
];

export function LoginDialog({
  handleCloseLoginDialog,
  handleOpenSignUpDialog,
  isLoginDialogOpen,
}: LoginDialogProps) {
  const [focusedInputIndex, setFocusedInputIndex] = useState<null | number>(
    null,
  );
  return (
    <DialogWrapper
      handleCloseDialog={handleCloseLoginDialog}
      isDialogOpen={isLoginDialogOpen}
      maxWidth="xs"
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
      </Box>
    </DialogWrapper>
  );
}
