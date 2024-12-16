import { useRef, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

import { CalendarRefType } from "./Multicalendar.types";

export function useMulticalendar() {
  const [selectedPropertyValue, setSelectedPropertyValue] =
    useState<number>(10);
  const [selectedShowOptionValue, setSelectedShowOptionValue] =
    useState<number>(1);

  const handlePropertyChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPropertyValue(event.target.value as number);
  };

  const calendarRef = useRef<CalendarRefType>(null);

  const handleShowOptionChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedShowOptionValue(event.target.value as number);
    if (calendarRef?.current) {
      if (event.target.value === 1) {
        calendarRef.current.getApi().changeView("multiMonth");
      } else {
        calendarRef.current.getApi().changeView("multiMonthYear");
      }
    }
  };
  return {
    handlePropertyChange,
    handleShowOptionChange,
    selectedPropertyValue,
    selectedShowOptionValue,
  };
}
