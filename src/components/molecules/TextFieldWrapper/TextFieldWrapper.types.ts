import { Control, FieldValues, RegisterOptions } from "react-hook-form";

export interface TextFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  endAdornment?: React.ReactNode;
  error?: string;
  label: string;
  name: string;
  rules: RegisterOptions;
  startAdornment?: React.ReactNode;
  type?: string;
}
