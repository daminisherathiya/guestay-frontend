import { useBoolean } from "@/hooks/useBoolean";

export function useForgotPasswordDialog() {
  const {
    value: ResetPasswordDialogIsOpen,
    setTrue: setResetPasswordDialogIsOpenTrue,
    setFalse: setResetPasswordDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  return {
    ResetPasswordDialogIsOpen,
    setResetPasswordDialogIsOpenFalse,
    setResetPasswordDialogIsOpenTrue,
  };
}
