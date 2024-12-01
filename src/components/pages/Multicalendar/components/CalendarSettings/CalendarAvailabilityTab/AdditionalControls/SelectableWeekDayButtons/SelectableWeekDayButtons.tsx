"use client";
import React, { useState } from "react";

import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";

export default function SelectableWeekDayButtons() {
  const initialDays = [
    { name: "Sunday", selected: true },
    { name: "Monday", selected: false },
    { name: "Tuesday", selected: false },
    { name: "Wednesday", selected: true },
    { name: "Thursday", selected: false },
    { name: "Friday", selected: true },
    { name: "Saturday", selected: false },
  ];

  const [days, setDays] = useState(initialDays);

  const handleToggle = (index) => {
    setDays((prevDays) =>
      prevDays.map((day, i) =>
        i === index ? { ...day, selected: !day.selected } : day,
      ),
    );
  };

  return (
    <Stack className="flex-row flex-wrap items-center gap-3">
      {days.map((day, index) => (
        <Button
          key={day.name}
          className={`rounded-pill border hover:border-common-transparent ${day.selected ? "border-common-transparent bg-action-hover ring-2 ring-primary-main" : "border-divider bg-common-transparent hover:ring-1 hover:ring-primary-main "}`}
          variant="outlined"
          onClick={() => handleToggle(index)}
        >
          {day.name}
        </Button>
      ))}
    </Stack>
  );
}
