import { useRef, useState } from "react";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useToggle } from "@/hooks/useToggle/useToggle";

export function usePrice() {
  const { value: isPriceVisible, toggle: setIsPriceVisibleTrue } = useToggle({
    initialValue: false,
  });

  const {
    value: isEditing,
    setTrue: setIsEditingTrue,
    setFalse: setIsEditingFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: moreAboutPricingDialogIsOpen,
    setTrue: setMoreAboutPricingDialogIsOpenTrue,
    setFalse: setMoreAboutPricingDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const [value, setValue] = useState<string>("2,439");
  const [expanded, setExpanded] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    setIsEditingTrue();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatNumberWithCommas = (num: string) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    e.target.value = value;
    setValue(formatNumberWithCommas(value));
  };
  const toggleExpansion = (buttonIndex: number) => {
    setExpanded(buttonIndex);
  };

  return {
    expanded,
    handleEditClick,
    handleInput,
    inputRef,
    isEditing,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
    toggleExpansion,
    value,
  };
}
