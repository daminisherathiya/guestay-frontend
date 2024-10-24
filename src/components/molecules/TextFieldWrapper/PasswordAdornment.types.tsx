export interface PasswordAdornmentProps {
  handleClick: () => void;
  handleMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleMouseUp: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPassword: boolean;
}
