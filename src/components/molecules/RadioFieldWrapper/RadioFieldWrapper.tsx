import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

import { RadioFieldWrapperProps } from "./RadioFieldWrapper.types";

export function RadioFieldWrapper<T extends FieldValues>({
  className,
  control,
  label,
  name,
  options,
  rules,
}: RadioFieldWrapperProps<T>) {
  return (
    <FormControl className={className}>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            {...field}
            aria-labelledby={`${name}-label`}
            className="gap-y-2"
            name={name}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                classes={{ disabled: "opacity-60 cursor-not-allowed" }}
                control={
                  <Radio
                    classes={{ disabled: "text-primary-main" }}
                    className="py-0"
                  />
                }
                disabled={option.disabled}
                label={option.label}
                value={option.value}
              />
            ))}
          </RadioGroup>
        )}
        rules={rules}
      />
    </FormControl>
  );
}
