import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface TextareaAutosizeFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  id?: string;
  maxRows?: number;
  minRows?: number;
  name: Path<T>;
  placeholder: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}
