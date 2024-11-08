import { useToggle } from "@/hooks/useToggle/useToggle";

export function useTextFieldWrapper() {
  const { value: showPassword, toggle: setShowPasswordTrue } = useToggle({
    initialValue: false,
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return {
    handleMouseDownPassword,
    handleMouseUpPassword,
    setShowPasswordTrue,
    showPassword,
  };
}
