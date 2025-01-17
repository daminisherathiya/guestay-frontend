import { Dispatch, ReactNode, SetStateAction } from "react";

import { propertyPricingInfoApiResponseType } from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";

export interface MulticalendarContextType {
  blockedDates: string[];
  getPriceForDate: (date: Date) => number;
  propertyPricingInfoApiData: propertyPricingInfoApiResponseType | undefined;
  propertyPricingInfoApiIsFirstLoading: boolean;
  propertyPricingInfoApiIsSuccess: boolean;
  selectedCells: string[];
  selectedPropertyValue: number;
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
  setSelectedPropertyValue: Dispatch<SetStateAction<number>>;
  setWeekdaysPrice: Dispatch<SetStateAction<number>>;
  setWeekendPrice: Dispatch<SetStateAction<number>>;
  weekdaysPrice: number;
  weekendPrice: number;
}

export interface MulticalendarContextProviderProps {
  children: ReactNode;
}
