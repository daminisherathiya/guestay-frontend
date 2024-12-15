import { useState } from "react";

export function usePriceBreakdownDialog() {
  const [adultsCounters, setAdultsCounters] = useState<number>(1);
  const [childrenCounters, setChildrenCounters] = useState<number>(0);
  const [infantsCounters, setInfantsCounters] = useState<number>(0);

  return {
    adultsCounters,
    childrenCounters,
    infantsCounters,
    setAdultsCounters,
    setChildrenCounters,
    setInfantsCounters,
  };
}
