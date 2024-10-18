import React, { useState } from "react";

import { useTextFieldWrapperProps } from "./TextFieldWrapper.types";

export function useTextFieldWrapper({ value }: useTextFieldWrapperProps) {
  const [inputValue, setInputValue] = useState<string | null>(
    value ? value : null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    inputValue,
    showPassword,
  };
}
