import { Dispatch, ReactNode, SetStateAction } from "react";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { propertyPricingInfoApiResponseType } from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";

export interface MulticalendarContextType {
  blockedDates: string[];
  getPriceForDate: (date: Date) => number;
  getSelectedDaysType: () => "weekday" | "weekend" | "both" | "notSelected";
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
  selectedPropertyValue: number;
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
  setSelectedPropertyValue: Dispatch<SetStateAction<number>>;
  weekdayPrice: string;
  weekendPrice: string;
}

export interface MulticalendarContextProviderProps {
  children: ReactNode;
}
