import { ReactNode } from "react";

import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface TextFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  endAdornment?: ReactNode;
  error?: string;
  label: string;
  name: Path<T>;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  startAdornment?: ReactNode;
  type?: "tel" | "text" | "password" | "country-select";
}
