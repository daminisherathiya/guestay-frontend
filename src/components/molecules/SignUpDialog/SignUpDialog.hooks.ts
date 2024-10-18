import { useState } from "react";

export function useSignUpDialog() {
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(
    null,
  );
  return { focusedInputIndex, setFocusedInputIndex };
}
