import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface TextFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  endAdornment?: React.ReactNode;
  error?: string;
  label: string;
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  startAdornment?: React.ReactNode;
  type?: "tel" | "text" | "password" | "country-select";
}
