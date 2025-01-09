import { Dispatch, ReactNode, SetStateAction } from "react";

export interface MulticalendarContextProviderType {
  blockedDates: string[];
  propertyPricingInfoApiIsFirstLoading: boolean;
  selectedCells: string[];
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
  weekdaysPrice: string;
  weekendPrice: string;
}

export interface MulticalendarContextProviderProps
  extends MulticalendarContextProviderType {
  children: ReactNode;
}
