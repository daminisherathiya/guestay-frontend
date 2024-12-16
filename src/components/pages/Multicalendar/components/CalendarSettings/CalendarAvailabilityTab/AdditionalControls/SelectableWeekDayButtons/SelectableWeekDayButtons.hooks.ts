import { useState } from "react";

import { initialDays } from "./SelectableWeekDayButtons.consts";
import { InitialDays } from "./SelectableWeekDayButtons.types";

export function useSelectableWeekDayButtons() {
  const [days, setDays] = useState<InitialDays[]>(initialDays);

  const handleToggle = (index: number) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === index ? { ...day, selected: !day.selected } : day,
      ),
    );
  };
  return { days, handleToggle };
}
