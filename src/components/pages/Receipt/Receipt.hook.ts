import { useBoolean } from "@/hooks/useBoolean/useBoolean";

export function useReceipt() {
  const {
    value: fullReceiptPreviewDialogIsOpen,
    setTrue: setFullReceiptPreviewDialogIsOpenTrue,
    setFalse: setFullReceiptPreviewDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  return {
    fullReceiptPreviewDialogIsOpen,
    setFullReceiptPreviewDialogIsOpenFalse,
    setFullReceiptPreviewDialogIsOpenTrue,
  };
}
