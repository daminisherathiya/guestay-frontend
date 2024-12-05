import { useRef } from "react";

import { useBoolean } from "@/hooks/useBoolean";
import { useToggle } from "@/hooks/useToggle";

export function usePriceWithTaxCalculation() {
  const priceInputRef = useRef<HTMLInputElement | null>(null);

  const { toggle: setIsPriceVisibleTrue, value: isPriceVisible } = useToggle({
    initialValue: true,
  });

  const {
    value: moreAboutPricingDialogIsOpen,
    setTrue: setMoreAboutPricingDialogIsOpenTrue,
    setFalse: setMoreAboutPricingDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: isEditing,
    setTrue: setIsEditingTrue,
    setFalse: setIsEditingFalse,
  } = useBoolean({ initialValue: false });

  const handleEditClick = () => {
    setIsEditingTrue();
    if (priceInputRef.current) {
      priceInputRef.current.focus();
    }
  };

  return {
    handleEditClick,
    isEditing,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    priceInputRef,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
  };
}
