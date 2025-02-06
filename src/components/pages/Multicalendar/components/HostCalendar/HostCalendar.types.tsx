import { Dispatch, SetStateAction } from "react";

import { CalendarRefType } from "../../Multicalendar.types";

export interface CalendarProps {
  calendarRef: CalendarRefType;
}

export interface CalendarEvent {
  allDay?: boolean;
  amount?: number;
  avatar?: string;
  backgroundColor: string;
  borderColor: string;
  description: string;
  end?: string;
  guestCount?: number;
  id: string;
  start: string;
  title: string;
  type: string;
}

export interface _HostCalendarProps {
  blockedDates: string[];
  getPriceForDate: (date: Date) => number;
  isPropertyPricingInfoApiIsLoading: boolean;
  propertyId: number;
  selectedCells: string[];
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
}

export interface useHostCalendarProps {
  blockedDates: string[];
  propertyId: number;
  selectedCells: string[];
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
}
