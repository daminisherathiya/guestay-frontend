import { Dispatch, ReactNode, SetStateAction } from "react";

export interface MulticalendarContextProviderType {
  blockedDates: string[];
  getPriceForDate: (date: Date) => number;
  propertyPricingInfoApiIsFirstLoading: boolean;
  selectedCells: string[];
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
  weekdaysPrice: number;
  weekendPrice: number;
}

export interface MulticalendarContextProviderProps
  extends MulticalendarContextProviderType {
  children: ReactNode;
}
