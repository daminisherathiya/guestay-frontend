import { useEffect } from "react";

import { useRouter } from "next/navigation";

import dayjs from "dayjs";

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

  const formatSelectedDates = (selectedCells: string[]) => {
    if (!selectedCells || selectedCells.length === 0) {
      return "";
    }

    if (selectedCells.length === 1) {
      const parsedDate = dayjs(selectedCells[0]);
      const singleDay = parsedDate.date();
      const month = parsedDate.format("MMM");
      return `${singleDay} ${month}`;
    }

    const parsedDates = selectedCells
      .map((date) => dayjs(date))
      .sort((a, b) => a.valueOf() - b.valueOf());

    let areConsecutive = true;
    for (let i = 0; i < parsedDates.length - 1; i++) {
      if (!parsedDates[i].add(1, "day").isSame(parsedDates[i + 1], "day")) {
        areConsecutive = false;
        break;
      }
    }
    if (!areConsecutive) {
      return `${parsedDates.length} nights`;
    }

    const startDay = parsedDates[0].date();
    const endDay = parsedDates[parsedDates.length - 1].date();
    const month = parsedDates[0].format("MMM");

    return `${startDay}–${endDay} ${month}`;
  };

  const [selectedEditorTabIndex, handleEditorTabChange] = useTabIndex({
    initialIndex: selectedCells.length === blockedDates.length ? 1 : 0,
  });

  const selectedDatePriceRange = minMaxSelectedDatePrice();
  const selectedDatePriceRangeInString =
    selectedDatePriceRange.minPrice === selectedDatePriceRange.maxPrice
      ? `₹${selectedDatePriceRange.minPrice}`
      : `₹${selectedDatePriceRange.minPrice} – ₹${selectedDatePriceRange.maxPrice}`;

  return {
    formatSelectedDates,
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
