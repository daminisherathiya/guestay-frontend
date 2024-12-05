import { MouseEvent } from "react";

export interface PasswordAdornmentProps {
  handleClick: () => void;
  handleMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  handleMouseUp: (event: MouseEvent<HTMLButtonElement>) => void;
  showPassword: boolean;
}
