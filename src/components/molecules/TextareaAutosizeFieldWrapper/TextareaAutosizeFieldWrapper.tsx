import { FormHelperText, TextareaAutosize } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

import { FormControl } from "@/components/atoms/FormControl";

import { TextareaAutosizeFieldWrapperProps } from "./TextareaAutosizeFieldWrapper.types";

export function TextareaAutosizeFieldWrapper<T extends FieldValues>({
  control,
  name,
  placeholder,
  maxRows = 4,
  minRows = 4,
  id,
  rules,
}: TextareaAutosizeFieldWrapperProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <TextareaAutosize
            {...field}
            className={`w-full rounded-lg border p-3 focus:outline-2 focus:outline-common-black ${
              error ? "border-error-main" : ""
            }`}
            id={id || name}
            maxRows={maxRows}
            minRows={minRows}
            name={name}
            placeholder={placeholder}
          />
          <FormHelperText className="mx-2 mt-0">
            {error ? error.message : ""}
          </FormHelperText>
        </FormControl>
      )}
      rules={rules}
    />
  );
}
