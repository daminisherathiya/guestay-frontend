import { Dispatch, SetStateAction } from "react";

import { CalendarRefType } from "../../Multicalendar.types";

export interface CalendarProps {
  calendarRef: CalendarRefType;
}

export interface _HostCalendarProps {
  blockedDates: string[];
  getPriceForDate: (date: Date) => number;
  propertyId: number;
  propertyPricingInfoApiIsLoading: boolean;
  selectedCells: string[];
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
}

export interface useHostCalendarProps {
  blockedDates: string[];
  propertyId: number;
  selectedCells: string[];
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
}
