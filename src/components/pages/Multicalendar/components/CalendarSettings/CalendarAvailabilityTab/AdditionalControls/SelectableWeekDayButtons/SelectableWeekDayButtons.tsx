"use client";

import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";

import { useSelectableWeekDayButtons } from "./SelectableWeekDayButtons.hooks";

export function SelectableWeekDayButtons() {
  const { days, handleToggle } = useSelectableWeekDayButtons();

  return (
    <Stack className="flex-row flex-wrap items-center gap-3">
      {days.map((day, index) => (
        <Button
          key={day.name}
          className={`rounded-pill border font-normal hover:border-common-transparent ${day.selected ? "border-common-transparent bg-action-hover ring-2 ring-primary-main" : "border-divider bg-common-transparent hover:ring-1 hover:ring-primary-main "}`}
          variant="outlined"
          onClick={() => handleToggle(index)}
        >
          {day.name}
        </Button>
      ))}
    </Stack>
  );
}
