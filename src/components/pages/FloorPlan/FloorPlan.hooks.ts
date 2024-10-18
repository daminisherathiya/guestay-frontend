import { useState } from "react";

import { CounterState } from "./FloorPlan.type";
export function useFloorPlan() {
  const [counters, setCounters] = useState<CounterState>({
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    guests: 1,
  });

  const handleIncrease = (field: keyof CounterState, maxLimit: number) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 1
              : prevCounters[field],
        };
      }
    });
  };

  const handleDecrease = (field: keyof CounterState) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 1
              : prevCounters[field],
        };
      }
    });
  };

  const displayValue = (
    value: number,
    max: number,
    field: keyof CounterState,
  ) => {
    return field === "guests" && value === max ? `${value}+` : value;
  };
  return { counters, displayValue, handleDecrease, handleIncrease };
}
