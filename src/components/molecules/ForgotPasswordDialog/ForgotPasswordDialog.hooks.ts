import { useState } from "react";

import { useBoolean } from "@/hooks/useBoolean";

export function useForgotPasswordDialog() {
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(
    null,
  );

  const {
    value: ResetPasswordDialogIsOpen,
    setTrue: setResetPasswordDialogIsOpenTrue,
    setFalse: setResetPasswordDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  return {
    focusedInputIndex,
    ResetPasswordDialogIsOpen,
    setFocusedInputIndex,
    setResetPasswordDialogIsOpenFalse,
    setResetPasswordDialogIsOpenTrue,
  };
}
