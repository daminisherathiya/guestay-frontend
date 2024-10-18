import { useState } from "react";

export function useLoginDialog() {
  const [focusedInputIndex, setFocusedInputIndex] = useState<number | null>(
    null,
  );
  return { focusedInputIndex, setFocusedInputIndex };
}
