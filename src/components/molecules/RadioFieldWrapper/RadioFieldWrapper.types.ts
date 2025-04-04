import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface RadioFieldWrapperProps<T extends FieldValues> {
  className?: string;
  control: Control<T>;
  label: string;
  name: Path<T>;
  options: { label: string; value: string }[];
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}
