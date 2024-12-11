import { useBoolean } from "@/hooks/useBoolean";

export function useDiscountsLearnMoreDialog() {
  const {
    value: discountsLearnMoreDialogIsOpen,
    setTrue: setDiscountsLearnMoreDialogIsOpenTrue,
    setFalse: setDiscountsLearnMoreDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });
  return {
    discountsLearnMoreDialogIsOpen,
    setDiscountsLearnMoreDialogIsOpenFalse,
    setDiscountsLearnMoreDialogIsOpenTrue,
  };
}
