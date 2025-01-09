import { Dispatch, SetStateAction } from "react";

import {
  holiday,
  seasonal,
} from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";

import { CalendarRefType } from "../../Multicalendar.types";

export interface CalendarProps {
  calendarRef: CalendarRefType;
}

export interface CalendarEvent {
  allDay?: boolean;
  amount?: number;
  avatar?: string;
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
  holidayPricing: holiday;
  propertyPricingInfoApiIsFirstLoading: boolean;
  seasonalPricing: seasonal;
  selectedCells: string[];
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
  weekdaysPrice: string;
  weekendPrice: string;
}

export interface useHostCalendarProps {
  blockedDates: string[];
  selectedCells: string[];
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
}
