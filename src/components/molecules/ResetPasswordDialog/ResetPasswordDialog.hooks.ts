import { useState } from "react";

export function useResetPasswordDialog() {
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(
    null,
  );

  return {
    focusedInputIndex,
    setFocusedInputIndex,
  };
}
