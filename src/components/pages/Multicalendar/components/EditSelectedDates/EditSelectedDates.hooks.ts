import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useBoolean } from "@/hooks/useBoolean";
import { useTabIndex } from "@/hooks/useTabIndex";

import { useEditSelectedDatesProps } from "./useEditSelectedDates.types";

export function useEditSelectedDates({
  blockedDates,
  minMaxSelectedDatePrice,
  selectedCells,
  setBlockedDates,
}: useEditSelectedDatesProps) {
  const {
    value: priceBreakdownDialogIsOpen,
    setTrue: setPriceBreakdownDialogIsOpenTrue,
    setFalse: setPriceBreakdownDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const handleBlockDates = () => {
    setBlockedDates((prev) => [...prev, ...selectedCells]);
  };

  const handleUnblockDates = () => {
    setBlockedDates((prev) =>
      prev.filter((date) => !selectedCells.includes(date)),
    );
  };

  const router = useRouter();

  const handleOpenPricingSettings = () => {
    router.push("./pricing-settings");
  };

  useEffect(() => {
    if (!selectedCells || selectedCells.length === 0) {
      router.push("./pricing-settings");
    }
  }, [router, selectedCells]);

  const [selectedEditorTabIndex, handleEditorTabChange] = useTabIndex({
    initialIndex: selectedCells.length === blockedDates.length ? 1 : 0,
  });

  const selectedDatePriceRange = minMaxSelectedDatePrice();
  const selectedDatePriceRangeInString =
    selectedDatePriceRange.minPrice === selectedDatePriceRange.maxPrice
      ? `$${selectedDatePriceRange.minPrice}`
      : `$${selectedDatePriceRange.minPrice} – $${selectedDatePriceRange.maxPrice}`;

  return {
    handleBlockDates,
    handleEditorTabChange,
    handleOpenPricingSettings,
    handleUnblockDates,
    priceBreakdownDialogIsOpen,
    selectedDatePriceRangeInString,
    selectedEditorTabIndex,
    setPriceBreakdownDialogIsOpenFalse,
    setPriceBreakdownDialogIsOpenTrue,
  };
}
