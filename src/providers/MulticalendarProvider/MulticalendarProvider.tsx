"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams, useRouter } from "next/navigation";

import dayjs from "dayjs";

import { allBookingsApi } from "@/apis/multiCalendar/allBookingsApi";
import { allBookingsApiResponseType } from "@/apis/multiCalendar/allBookingsApi/allBookingsApi.types";
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
  const router = useRouter();

  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [selectedPropertyValue, setSelectedPropertyValue] = useState<number>(
    Number(propertyId),
  );

  const {
    data: propertyPricingInfoApiData,
    isFetching: propertyPricingInfoApiIsFetching,
    isFirstLoading: propertyPricingInfoApiIsFirstLoading,
    isSuccess: propertyPricingInfoApiIsSuccess,
    refetch: propertyPricingInfoApiRefetch,
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

  const currentDate = dayjs();

  const calendarStartMonth = currentDate
    .subtract(12, "months")
    .startOf("month")
    .format("YYYY-MM-DD");

  const calendarEndMonth = currentDate

    .add(12, "months")
    .startOf("month")
    .format("YYYY-MM-DD");

  const {
    data: allBookingsApiData,
    isSuccess: allBookingsApiIsSuccess,
    isFirstLoading: allBookingsApiIsFirstLoading,
  } = useQuery<allBookingsApiResponseType, Error, allBookingsApiResponseType>({
    queryFn: () => {
      return allBookingsApi({
        data: {
          endDate: calendarEndMonth,
          onlyMyBookings: "0",
          propertyId: propertyId,
          startDate: calendarStartMonth,
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["all-bookings"],
  });

  const isPropertyPricingInfoApiIsLoading =
    propertyPricingInfoApiIsFirstLoading || propertyPricingInfoApiIsFetching;

  const weekdayPrice = useMemo(() => {
    if (propertyPricingInfoApiData && propertyPricingInfoApiIsSuccess) {
      return parseInt(
        propertyPricingInfoApiData.data.weekdays_price,
      ).toString();
    }
    return "0";
  }, [propertyPricingInfoApiData, propertyPricingInfoApiIsSuccess]);

  const weekendPrice = useMemo(() => {
    if (propertyPricingInfoApiData && propertyPricingInfoApiIsSuccess) {
      return parseInt(propertyPricingInfoApiData.data.weekend_price).toString();
    }
    return "0";
  }, [propertyPricingInfoApiData, propertyPricingInfoApiIsSuccess]);

  const getPricingPeriod = useCallback(
    (date: Date): Holiday | Seasonal | null => {
      const dateStr = dayjs(date).format("YYYY-MM-DD");

      const holidayPrice = propertyPricingInfoApiData?.data.holiday?.findLast(
        (holiday) => {
          const startDate = dayjs(holiday.start_at).format("YYYY-MM-DD");
          const endDate = dayjs(holiday.end_at).format("YYYY-MM-DD");
          return dateStr >= startDate && dateStr <= endDate;
        },
      );

      if (holidayPrice) {
        return holidayPrice;
      }

      const seasonalPrice = propertyPricingInfoApiData?.data.seasonal?.findLast(
        (season) => {
          const startDate = dayjs(season.start_at).format("YYYY-MM-DD");
          const endDate = dayjs(season.end_at).format("YYYY-MM-DD");
          return dateStr >= startDate && dateStr <= endDate;
        },
      );

      if (seasonalPrice) {
        return seasonalPrice;
      }

      return null;
    },
    [propertyPricingInfoApiData],
  );

  const priceCache = useMemo(() => {
    if (!propertyPricingInfoApiData?.data) return new Map();

    const cache = new Map();
    // Todo: Use variable instead of hard-coded 12 and use the same in HostCalendar
    const startDate = dayjs().subtract(12, "months").startOf("month");
    const endDate = dayjs().add(12, "months").endOf("month");

    let currentDate = startDate;
    while (currentDate.isBefore(endDate)) {
      const date = currentDate.toDate();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const specialPricing = getPricingPeriod(date);

      let price;
      if (specialPricing) {
        if (!("weekend_price" in specialPricing)) {
          price = parseInt(specialPricing.price, 10);
        } else {
          price = isWeekend
            ? parseInt(specialPricing?.weekend_price, 10)
            : parseInt(specialPricing.price, 10);
        }
      } else {
        const weekdaysPrice = parseInt(
          propertyPricingInfoApiData?.data.weekdays_price ?? "0",
        );
        const weekendPrice = parseInt(
          propertyPricingInfoApiData?.data.weekend_price ?? "0",
        );
        price = isWeekend && weekendPrice !== 1 ? weekendPrice : weekdaysPrice;
      }

      cache.set(currentDate.format("YYYY-MM-DD"), price);
      currentDate = currentDate.add(1, "day");
    }

    return cache;
  }, [propertyPricingInfoApiData, getPricingPeriod]);

  const getPriceForDate = useCallback(
    (date: Date) => {
      console.log("🚀 ~ date:", date);
      const dateStr = dayjs(date).format("YYYY-MM-DD");
      return priceCache.get(dateStr) ?? 0;
    },
    [priceCache],
  );

  const minMaxSelectedDatePrice = useCallback(() => {
    const prices = selectedCells.map((selectedCell) => {
      return getPriceForDate(
        dayjs.tz(selectedCell, "YYYY-MM-DD", "UTC").toDate(),
      );
    });
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    return {
      maxPrice: maxPrice,
      minPrice: minPrice,
    };
  }, [getPriceForDate, selectedCells]);

  useEffect(() => {
    if (selectedCells.length > 0) {
      router.replace(`/multicalendar/${propertyId}/edit-selected-dates`, {
        scroll: false,
      });
    }
  }, [selectedCells, router, propertyId]);

  const getSelectedDaysType = useCallback(() => {
    if (selectedCells.length === 0) return "notSelected";

    let hasWeekend = false;
    let hasWeekday = false;

    for (const date of selectedCells) {
      const day = dayjs(date).day();
      if (day === 0 || day === 6) {
        hasWeekend = true;
      } else {
        hasWeekday = true;
      }

      if (hasWeekend && hasWeekday) {
        return "both";
      }
    }
    return hasWeekend ? "weekend" : "weekday";
  }, [selectedCells]);

  return (
    <MulticalendarContext.Provider
      value={{
        allBookingsApiData,
        allBookingsApiIsFirstLoading,
        allBookingsApiIsSuccess,
        blockedDates,
        calendarEndMonth,
        calendarStartMonth,
        getPriceForDate,
        getSelectedDaysType,
        isPropertyPricingInfoApiIsLoading,
        minMaxSelectedDatePrice,
        propertyPricingInfoApiData,
        propertyPricingInfoApiIsSuccess,
        propertyPricingInfoApiRefetch,
        selectedCells,
        selectedPropertyValue,
        setBlockedDates,
        setSelectedCells,
        setSelectedPropertyValue,
        weekdayPrice,
        weekendPrice,
      }}
    >
      {children}
    </MulticalendarContext.Provider>
  );
}
