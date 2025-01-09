import { useParams, useRouter } from "next/navigation";

import { useBoolean } from "@/hooks/useBoolean";

import dayjs from "dayjs";

export function useEditSelectedDates({
  selectedCells,
  setSelectedCells,
  setBlockedDates,
}) {
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
    setSelectedCells([]);
  };

  const formatSelectedDates = (selectedCells:string[]) => {
    if (!selectedCells || selectedCells.length === 0) return "";

    if (selectedCells.length === 1) {
      const parsedDate = dayjs(selectedCells[0])
      const singleDay = parsedDate.date();
      const month = parsedDate.format('MMM');
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

  return {
    formatSelectedDates,
    handleBlockDates,
    handleOpenPricingSettings,
    handleUnblockDates,
    priceBreakdownDialogIsOpen,
    setPriceBreakdownDialogIsOpenFalse,
    setPriceBreakdownDialogIsOpenTrue,
  };
}
