"use client";

import { createContext, useEffect, useState } from "react";

import { useParams } from "next/navigation";

import dayjs from "dayjs";

import { propertyPricingInfoApi } from "@/apis/multiCalendar/propertyPricingInfoApi";
import {
  Holiday,
  Seasonal,
  propertyPricingInfoApiResponseType,
} from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import {
  MulticalendarContextProviderProps,
  MulticalendarContextType,
} from "./MulticalendarProvider.types";

export const MulticalendarContext = createContext<
  MulticalendarContextType | undefined
>(undefined);

export function MulticalendarContextProvider({
  children,
}: MulticalendarContextProviderProps) {
  const { propertyId }: { propertyId: string } = useParams();
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [selectedPropertyValue, setSelectedPropertyValue] = useState<number>(
    Number(propertyId),
  );
  const [weekdaysPrice, setWeekdaysPrice] = useState<number>(0);
  const [weekendPrice, setWeekendPrice] = useState<number>(0);

  const {
    data: propertyPricingInfoApiData,
    isFirstLoading: propertyPricingInfoApiIsFirstLoading,
    isSuccess: propertyPricingInfoApiIsSuccess,
  } = useQuery<
    propertyPricingInfoApiResponseType,
    Error,
    propertyPricingInfoApiResponseType
  >({
    queryFn: () => {
      return propertyPricingInfoApi({
        data: {
          propertyId: String(selectedPropertyValue),
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["property_pricing_info", selectedPropertyValue],
  });

  useEffect(() => {
    if (propertyPricingInfoApiData && propertyPricingInfoApiIsSuccess) {
      setWeekdaysPrice(
        parseInt(propertyPricingInfoApiData.data.weekdays_price, 10),
      );
      setWeekendPrice(
        parseInt(propertyPricingInfoApiData.data.weekend_price, 10),
      );
    }
    console.log(
      "🚀 ~ useEffect ~ propertyPricingInfoApiData.data.weekdays_price:",
      propertyPricingInfoApiData?.data.weekdays_price,
    );
  }, [propertyPricingInfoApiData, propertyPricingInfoApiIsSuccess]);

  const getPricingPeriod = (date: Date): Holiday | Seasonal | null => {
    const dateStr = dayjs(date).format("YYYY-MM-DD HH:mm:ss");

    const holidayPrice = propertyPricingInfoApiData?.data.holiday?.find(
      (holiday) => dateStr >= holiday.start_at && dateStr <= holiday.end_at,
    );
    console.log(
      "🚀 ~ getPricingPeriod ~ propertyPricingInfoApiData:",
      propertyPricingInfoApiData,
    );
    if (holidayPrice) {
      return holidayPrice;
    }

    const seasonalPrice = propertyPricingInfoApiData?.data.seasonal?.find(
      (season) => dateStr >= season.start_at && dateStr <= season.end_at,
    );
    console.log("🚀 ~ getPricingPeriod ~ seasonalPrice:", seasonalPrice);
    if (seasonalPrice) {
      return seasonalPrice;
    }

    return null;
  };

  const getPriceForDate = (date: Date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const specialPricing = getPricingPeriod(date);

    if (specialPricing) {
      if (!("weekend_price" in specialPricing)) {
        return parseInt(specialPricing.price, 10);
      }
      return isWeekend
        ? parseInt(specialPricing?.weekend_price, 10)
        : parseInt(specialPricing.price, 10);
    }
    return isWeekend && weekendPrice !== 1 ? weekendPrice : weekdaysPrice;
  };

  return (
    <MulticalendarContext.Provider
      value={{
        blockedDates,
        getPriceForDate,
        propertyPricingInfoApiData,
        propertyPricingInfoApiIsFirstLoading,
        propertyPricingInfoApiIsSuccess,
        selectedCells,
        selectedPropertyValue,
        setBlockedDates,
        setSelectedCells,
        setSelectedPropertyValue,
        setWeekdaysPrice,
        setWeekendPrice,
        weekdaysPrice,
        weekendPrice,
      }}
    >
      {children}
    </MulticalendarContext.Provider>
  );
}
