import { MouseEvent } from "react";

import { useToggle } from "@/hooks/useToggle/useToggle";

export function useTextFieldWrapper() {
  const { toggle: setShowPasswordTrue, value: showPassword } = useToggle({
    initialValue: false,
  });

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return {
    handleMouseDownPassword,
    handleMouseUpPassword,
    setShowPasswordTrue,
    showPassword,
  };
}
