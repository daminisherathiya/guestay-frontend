"use client";

import { createContext } from "react";

import {
  MulticalendarContextProviderProps,
  MulticalendarContextProviderType,
} from "./MulticalendarProvider.types";

export const MulticalendarContext = createContext<
  MulticalendarContextProviderType | undefined
>(undefined);

export function MulticalendarContextProvider({
  blockedDates,
  getPriceForDate,
  children,
  propertyPricingInfoApiIsFirstLoading,
  setBlockedDates,
  selectedCells,
  setSelectedCells,
  weekdaysPrice,
  weekendPrice,
}: MulticalendarContextProviderProps) {
  return (
    <MulticalendarContext.Provider
      value={{
        blockedDates,
        getPriceForDate,
        propertyPricingInfoApiIsFirstLoading,
        selectedCells,
        setBlockedDates,
        setSelectedCells,
        weekdaysPrice,
        weekendPrice,
      }}
    >
      {children}
    </MulticalendarContext.Provider>
  );
}
