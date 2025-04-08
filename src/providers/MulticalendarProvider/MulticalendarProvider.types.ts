import { Dispatch, ReactNode, SetStateAction } from "react";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

import { allBookingsApiResponseType } from "@/apis/multiCalendar/allBookingsApi/allBookingsApi.types";
import { getBlockOutDatesApiResponseType } from "@/apis/multiCalendar/getBlockOutDatesApi/getBlockOutDatesApi.types";
import { propertyPricingInfoApiResponseType } from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";

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

export interface MulticalendarContextType {
  allBookingsApiData: allBookingsApiResponseType | undefined;
  allBookingsApiIsLoading: boolean;
  allBookingsApiIsSuccess: boolean;
  blockedDates: string[];
  calendarEndMonth: string;
  calendarStartMonth: string;
  events: CalendarEvent[];
  formatSelectedDates: ({ passedDates }: { passedDates: string[] }) => string;
  getBlockOutDatesApiData: getBlockOutDatesApiResponseType | undefined;
  getBlockOutDatesApiIsLoading: boolean;
  getBlockOutDatesApiIsSuccess: boolean;
  getBlockOutDatesApiRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<getBlockOutDatesApiResponseType, Error>>;
  getConsecutiveDateRanges: ({ passedDates }: { passedDates: string[] }) => {
    endDates: string[];
    startDates: string[];
  };
  getPriceForDate: (date: Date) => number;
  minMaxSelectedDatePrice: () => {
    maxPrice: number;
    minPrice: number;
  };
  propertyPricingInfoApiData: propertyPricingInfoApiResponseType | undefined;
  propertyPricingInfoApiIsLoading: boolean;
  propertyPricingInfoApiIsSuccess: boolean;
  propertyPricingInfoApiRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<propertyPricingInfoApiResponseType, Error>>;
  selectedCells: string[];
  selectedDaysType: "weekday" | "weekend" | "both" | "notSelected";
  selectedPropertyValue: number;
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setEvents: Dispatch<SetStateAction<CalendarEvent[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
  setSelectedPropertyValue: Dispatch<SetStateAction<number>>;
  todaysDate: Dayjs;
  weekdayPrice: string;
  weekendPrice: string;
}

export interface MulticalendarContextProviderProps {
  children: ReactNode;
}
