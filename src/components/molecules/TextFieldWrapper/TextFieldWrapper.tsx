import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

import { IconButton } from "@/components/atoms/IconButton";
import { InputAdornment } from "@/components/atoms/InputAdornment";

import { CountrySelect } from "../CountrySelect/CountrySelect";

import { useTextFieldWrapper } from "./TextFieldWrapper.hooks";
import { TextFieldWrapperProps } from "./TextFieldWrapper.types";

function PasswordAdornment({
  handleClick,
  handleMouseDown,
  handleMouseUp,
  showPassword,
}: {
  handleClick: () => void;
  handleMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPassword: boolean;
}) {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}

export function TextFieldWrapper({
  endAdornment,
  focusedInputIndex,
  handleBlur,
  handleFocus,
  index,
  label,
  startAdornment,
  totalFields,
  type = "text",
  value,
}: TextFieldWrapperProps) {
  const {
    handleChange,
    handleMouseDownPassword,
    handleMouseUpPassword,
    inputValue,
    setShowPasswordTrue,
    showPassword,
  } = useTextFieldWrapper({ value });

  if (type === "country-select") {
    return (
      <CountrySelect
        focusedInputIndex={focusedInputIndex}
        index={index}
        totalFields={totalFields}
      />
    );
  }

  return (
    <TextField
      key={index}
      className="w-full"
      id={`filled-basic-${index}`}
      label={label}
      slotProps={{
        input: {
          classes: {
            focused: "before:border-y-common-transparent",
          },
          className: `before:h-full ${
            index === 0 ? "before:rounded-t-lg" : ""
          } ${
            index === totalFields - 1
              ? "before:rounded-b-lg before:!border-b"
              : ""
          } ${
            focusedInputIndex === index - 1 ? "before:border-t-0" : ""
          } bg-common-white before:border-x before:border-b-0 before:border-t before:border-common-black/45 before:transition-none after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none`,
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
            <InputAdornment position="start">{startAdornment}</InputAdornment>
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
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={inputValue}
      variant="filled"
      onBlur={() => handleBlur(null)}
      onChange={handleChange}
      onFocus={() => handleFocus(index)}
    />
  );
}
