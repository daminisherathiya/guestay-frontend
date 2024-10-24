import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

import { InputAdornment } from "@/components/atoms/InputAdornment";

import { CountrySelect } from "../CountrySelect/CountrySelect";

import { PasswordAdornment } from "./PasswordAdornment";
import { useTextFieldWrapper } from "./TextFieldWrapper.hooks";
import { TextFieldWrapperProps } from "./TextFieldWrapper.types";

export function TextFieldWrapper<T>({
  control,
  endAdornment,
  label,
  name,
  rules,
  startAdornment,
  type = "text",
}: TextFieldWrapperProps<T>) {
  const {
    handleMouseDownPassword,
    handleMouseUpPassword,
    setShowPasswordTrue,
    showPassword,
  } = useTextFieldWrapper();

  if (type === "country-select") {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CountrySelect
            value={field.value}
            onChange={(event, newValue) => field.onChange(newValue)}
          />
        )}
        rules={rules}
      />
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          className="w-full"
          error={!!error}
          helperText={error ? error.message : ""}
          label={label}
          slotProps={{
            formHelperText: { className: "mt-0 mx-2" },
            input: {
              className: `bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none ${error ? "before:border-error-main after:border-error-main" : ""}`,
              endAdornment:
                type === "password" ? (
                  <PasswordAdornment
                    handleClick={setShowPasswordTrue}
                    handleMouseDown={handleMouseDownPassword}
                    handleMouseUp={handleMouseUpPassword}
                    showPassword={showPassword}
                  />
                ) : endAdornment ? (
                  <InputAdornment position="end">{endAdornment}</InputAdornment>
                ) : null,
              startAdornment: startAdornment ? (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ) : null,
            },
          }}
          sx={{
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
              WebkitTextFillColor: "inherit",
            },
            "& input:-webkit-autofill:focus": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
            },
            "& input:-webkit-autofill:hover": {
              WebkitBoxShadow: "0 0 0 1000px white inset",
            },
          }}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          variant="filled"
        />
      )}
      rules={rules}
    />
  );
}
