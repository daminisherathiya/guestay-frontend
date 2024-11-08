import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface AutocompleteGoogleMapsProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
}
