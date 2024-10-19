import { useBoolean } from "@/hooks/useBoolean/useBoolean";

export function useDiscount() {
  const {
    value: discountsDialogIsOpen,
    setTrue: setDiscountsDialogIsOpenTrue,
    setFalse: setDiscountsDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    e.target.value = value;
  };
  return {
    discountsDialogIsOpen,
    handleInput,
    setDiscountsDialogIsOpenFalse,
    setDiscountsDialogIsOpenTrue,
  };
}
