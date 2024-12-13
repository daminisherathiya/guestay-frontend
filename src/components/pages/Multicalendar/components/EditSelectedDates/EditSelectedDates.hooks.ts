import { useBoolean } from "@/hooks/useBoolean";

export function useEditSelectedDates() {
  const {
    value: priceBreakdownDialogIsOpen,
    setTrue: setPriceBreakdownDialogIsOpenTrue,
    setFalse: setPriceBreakdownDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  return {
    priceBreakdownDialogIsOpen,
    setPriceBreakdownDialogIsOpenFalse,
    setPriceBreakdownDialogIsOpenTrue,
  };
}
