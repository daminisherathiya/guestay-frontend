import { useCallback, useState } from "react";

import { InitialGuestCounters } from "./PriceBreakdownDialog.types";

export function usePriceBreakdownDialog() {
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [infantsCount, setInfantsCount] = useState<number>(0);
  const [petsCount, setpetsCount] = useState<number>(0);

  const [initialGuestCounters, setInitialGuestCounters] =
    useState<InitialGuestCounters>({
      adults: adultsCount,
      children: childrenCount,
      infants: infantsCount,
    });

  const onCloseGuestCountSelect = useCallback(() => {
    setInitialGuestCounters({
      adults: adultsCount,
      children: childrenCount,
      infants: infantsCount,
    });
  }, [adultsCount, childrenCount, infantsCount]);

  const handleResetGuestCount = useCallback(() => {
    setAdultsCount(initialGuestCounters.adults);
    setChildrenCount(initialGuestCounters.children);
    setInfantsCount(initialGuestCounters.infants);
  }, [initialGuestCounters, setAdultsCount, setChildrenCount, setInfantsCount]);

  const onSaveGuestCountSelect = useCallback(() => {
    return adultsCount + childrenCount;
  }, [adultsCount, childrenCount]);

  const showGuestResetButton =
    adultsCount !== initialGuestCounters.adults ||
    childrenCount !== initialGuestCounters.children ||
    infantsCount !== initialGuestCounters.infants;

  const [initialPetsCounters, setInitialPetsCounters] =
    useState<number>(petsCount);

  const onClosePetsCountSelect = useCallback(() => {
    setInitialPetsCounters(petsCount);
  }, [petsCount]);

  const handleResetPetsCount = useCallback(() => {
    setpetsCount(initialPetsCounters);
  }, [initialPetsCounters]);

  const onSavePetsCountSelect = useCallback(() => {
    return petsCount;
  }, [petsCount]);

  const showPetsResetButton = petsCount !== initialPetsCounters;

  return {
    adultsCount,
    childrenCount,
    handleResetGuestCount,
    handleResetPetsCount,
    infantsCount,
    onCloseGuestCountSelect,
    onClosePetsCountSelect,
    onSaveGuestCountSelect,
    onSavePetsCountSelect,
    petsCount,
    setAdultsCount,
    setChildrenCount,
    setInfantsCount,
    setpetsCount,
    showGuestResetButton,
    showPetsResetButton,
  };
}
