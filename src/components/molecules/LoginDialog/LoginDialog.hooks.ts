import { useBoolean } from "@/hooks/useBoolean";

export function useLoginDialog() {
  const {
    value: ForgotPasswordDialogIsOpen,
    setTrue: setForgotPasswordDialogIsOpenTrue,
    setFalse: setForgotPasswordDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  return {
    ForgotPasswordDialogIsOpen,
    setForgotPasswordDialogIsOpenFalse,
    setForgotPasswordDialogIsOpenTrue,
  };
}
