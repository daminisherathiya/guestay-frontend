import { Dispatch, ReactNode, SetStateAction } from "react";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

import { allBookingsApiResponseType } from "@/apis/multiCalendar/allBookingsApi/allBookingsApi.types";
import { propertyPricingInfoApiResponseType } from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";

export interface MulticalendarContextType {
  allBookingsApiData: allBookingsApiResponseType | undefined;
  allBookingsApiIsFirstLoading: boolean;
  allBookingsApiIsSuccess: boolean;
  blockedDates: string[];
  calendarEndMonth: string;
  calendarStartMonth: string;
  getPriceForDate: (date: Date) => number;
  isPropertyPricingInfoApiIsLoading: boolean;
  minMaxSelectedDatePrice: () => {
    maxPrice: number;
    minPrice: number;
  };
  propertyPricingInfoApiData: propertyPricingInfoApiResponseType | undefined;
  propertyPricingInfoApiIsSuccess: boolean;
  propertyPricingInfoApiRefetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<propertyPricingInfoApiResponseType, Error>>;
  selectedCells: string[];
  selectedDaysType: "weekday" | "weekend" | "both" | "notSelected";
  selectedPropertyValue: number;
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
  setSelectedPropertyValue: Dispatch<SetStateAction<number>>;
  todaysDate: Dayjs;
  weekdayPrice: string;
  weekendPrice: string;
}

export interface MulticalendarContextProviderProps {
  children: ReactNode;
}
