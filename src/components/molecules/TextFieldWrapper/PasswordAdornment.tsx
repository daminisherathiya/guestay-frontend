import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { IconButton } from "@/components/atoms/IconButton";
import { InputAdornment } from "@/components/atoms/InputAdornment";

import { PasswordAdornmentProps } from "./PasswordAdornment.types";

export function PasswordAdornment({
  handleClick,
  handleMouseDown,
  handleMouseUp,
  showPassword,
}: PasswordAdornmentProps) {
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
