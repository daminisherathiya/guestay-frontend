import React, { useState } from "react";

import { useToggle } from "@/hooks/useToggle/useToggle";

import { useTextFieldWrapperProps } from "./TextFieldWrapper.types";

export function useTextFieldWrapper({ value }: useTextFieldWrapperProps) {
  const { value: showPassword, toggle: setShowPasswordTrue } = useToggle({
    initialValue: false,
  });

  const [inputValue, setInputValue] = useState<string | null>(
    value ? value : null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return {
    handleChange,
    handleMouseDownPassword,
    handleMouseUpPassword,
    inputValue,
    setShowPasswordTrue,
    showPassword,
  };
}
