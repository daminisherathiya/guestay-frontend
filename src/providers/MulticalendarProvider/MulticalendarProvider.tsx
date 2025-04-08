"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams, useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { allBookingsApi } from "@/apis/multiCalendar/allBookingsApi";
import { allBookingsApiResponseType } from "@/apis/multiCalendar/allBookingsApi/allBookingsApi.types";
import { getBlockOutDatesApi } from "@/apis/multiCalendar/getBlockOutDatesApi";
import { getBlockOutDatesApiResponseType } from "@/apis/multiCalendar/getBlockOutDatesApi/getBlockOutDatesApi.types";
import { propertyPricingInfoApi } from "@/apis/multiCalendar/propertyPricingInfoApi";
import {
  Holiday,
  Seasonal,
  propertyPricingInfoApiResponseType,
} from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE } from "./MulticalendarProvider.consts";
import {
  CalendarEvent,
  MulticalendarContextProviderProps,
  MulticalendarContextType,
} from "./MulticalendarProvider.types";

dayjs.extend(utc);
dayjs.extend(timezone);

export const MulticalendarContext = createContext<
  MulticalendarContextType | undefined
>(undefined);

export function MulticalendarContextProvider({
  children,
}: MulticalendarContextProviderProps) {
  const queryClient = useQueryClient();

  const { propertyId }: { propertyId: string } = useParams();
  const router = useRouter();

  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [selectedPropertyValue, setSelectedPropertyValue] = useState<number>(
    Number(propertyId),
  );
  const [events, setEvents] = useState<CalendarEvent[]>([]);

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

  const todaysDate = useMemo(() => dayjs(), []);
  console.log("🚀 ~ todaysDate:", todaysDate);

  const calendarStartMonth = useMemo(() => {
    return todaysDate
      .subtract(12, "months")
      .startOf("month")
      .format("YYYY-MM-DD");
  }, [todaysDate]);

  const calendarEndMonth = useMemo(() => {
    return todaysDate.add(12, "months").startOf("month").format("YYYY-MM-DD");
  }, [todaysDate]);

  const {
    data: allBookingsApiData,
    isSuccess: allBookingsApiIsSuccess,
    isFirstLoading: allBookingsApiIsLoading,
    refetch: allBookingsApiRefetch,
  } = useQuery<allBookingsApiResponseType, Error, allBookingsApiResponseType>({
    queryFn: () => {
      return allBookingsApi({
        data: {
          endDate: calendarEndMonth,
          onlyMyBookings: "0",
          propertyId: String(selectedPropertyValue),
          startDate: calendarStartMonth,
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["all-bookings", selectedPropertyValue],
  });

  const {
    data: getBlockOutDatesApiData,
    isFetching: getBlockOutDatesApiIsFetching,
    isSuccess: getBlockOutDatesApiIsSuccess,
    isFirstLoading: getBlockOutDatesApiIsFirstLoading,
    refetch: getBlockOutDatesApiRefetch,
  } = useQuery<
    getBlockOutDatesApiResponseType,
    Error,
    getBlockOutDatesApiResponseType
  >({
    queryFn: () => {
      return getBlockOutDatesApi({
        data: {
          endDate: calendarEndMonth,
          propertyId: String(selectedPropertyValue),
          startDate: calendarStartMonth,
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["get-block-out-dates", selectedPropertyValue],
  });

  useEffect(() => {
    // queryClient.setQueryData<allBookingsApiResponseType>(
    //   ["all-bookings", selectedPropertyValue],
    //   {
    //     data: {
    //       allBookings: [],
    //       allBookingsCount: 0,
    //       end_date: "",
    //       property_id: "",
    //       start_date: "",
    //     },
    //   },
    // );
    allBookingsApiRefetch();
    getBlockOutDatesApiRefetch();
  }, [
    allBookingsApiRefetch,
    getBlockOutDatesApiRefetch,
    queryClient,
    selectedPropertyValue,
  ]);

  const propertyPricingInfoApiIsLoading = useMemo(
    () =>
      propertyPricingInfoApiIsFirstLoading || propertyPricingInfoApiIsFetching,
    [propertyPricingInfoApiIsFetching, propertyPricingInfoApiIsFirstLoading],
  );

  const getBlockOutDatesApiIsLoading = useMemo(
    () => getBlockOutDatesApiIsFirstLoading || getBlockOutDatesApiIsFetching,
    [getBlockOutDatesApiIsFetching, getBlockOutDatesApiIsFirstLoading],
  );

  const propertyWeekendDays = useMemo(() => {
    if (
      propertyPricingInfoApiData &&
      propertyPricingInfoApiIsSuccess &&
      propertyPricingInfoApiData.data.property_weekend_days
    ) {
      const days = propertyPricingInfoApiData.data.property_weekend_days
        .split(",")
        .map(Number);
      return days.map((day) => day % 7);
    }
    return [];
  }, [propertyPricingInfoApiData, propertyPricingInfoApiIsSuccess]);

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
    const startDate = todaysDate.subtract(12, "months").startOf("month");
    const endDate = todaysDate.add(12, "months").endOf("month");

    let currentDate = startDate;
    while (currentDate.isBefore(endDate)) {
      const date = currentDate.toDate();
      const isWeekend = propertyWeekendDays.includes(date.getDay());
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
        price =
          isWeekend &&
          weekendPrice !== parseInt(WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE)
            ? weekendPrice
            : weekdaysPrice;
      }

      cache.set(currentDate.format("YYYY-MM-DD"), price);
      currentDate = currentDate.add(1, "day");
    }

    console.log("🚀 ~ priceCache ~ cache:", cache);
    return cache;
  }, [
    getPricingPeriod,
    propertyPricingInfoApiData,
    propertyWeekendDays,
    todaysDate,
  ]);

  const getPriceForDate = useCallback(
    (date: Date) => {
      const dateStr = dayjs(date).format("YYYY-MM-DD");
      // console.log("🚀 ~ date:", date, dateStr);
      return priceCache.get(dateStr) ?? 0;
    },
    [priceCache],
  );

  const minMaxSelectedDatePrice = useCallback(() => {
    const prices = selectedCells.map((selectedCell) => {
      return getPriceForDate(dayjs(selectedCell).toDate());
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

  const selectedDaysType = useMemo(() => {
    if (selectedCells.length === 0) return "notSelected";

    let hasWeekend = false;
    let hasWeekday = false;

    for (const date of selectedCells) {
      const day = dayjs(date).day();
      if (propertyWeekendDays.includes(day)) {
        hasWeekend = true;
      } else {
        hasWeekday = true;
      }

      if (hasWeekend && hasWeekday) {
        return "both";
      }
    }
    return hasWeekend ? "weekend" : "weekday";
  }, [propertyWeekendDays, selectedCells]);

  const formatSelectedDates = useCallback(({passedDates}: {passedDates: string[]}) => {
    if (!passedDates || passedDates.length === 0) {
      return "";
    }

    if (passedDates.length === 1) {
      const parsedDate = dayjs(passedDates[0]);
      const singleDay = parsedDate.date();
      const month = parsedDate.format("MMM");
      return `${singleDay} ${month}`;
    }

    const parsedDates = passedDates
      .map((date) => dayjs(date))
      .sort((a, b) => a.valueOf() - b.valueOf());

    let areConsecutive = true;
    for (let i = 0; i < parsedDates.length - 1; i++) {
      if (!parsedDates[i].add(1, "day").isSame(parsedDates[i + 1], "day")) {
        areConsecutive = false;
        break;
      }
    }
    if (!areConsecutive) {
      return `${parsedDates.length} nights`;
    }

    const startDay = parsedDates[0].date();
    const endDay = parsedDates[parsedDates.length - 1].date();
    const month = parsedDates[0].format("MMM");

    return `${startDay}–${endDay} ${month}`;
  }, []);

  const getConsecutiveDateRanges = useCallback(
    ({ passedDates }: { passedDates: string[] }) => {
      const sortedDates = [...passedDates].sort();
      const selectedCellsDateRanges: { endDate: string; startDate: string }[] =
        [];

      if (sortedDates.length === 0) return { endDates: [], startDates: [] };

      let rangeStart = sortedDates[0];
      let prevDate = sortedDates[0];

      for (let i = 1; i <= sortedDates.length; i++) {
        const currentDate = sortedDates[i];

        if (
          i === sortedDates.length ||
          dayjs(currentDate).diff(dayjs(prevDate), "day") > 1
        ) {
          selectedCellsDateRanges.push({
            endDate: prevDate,
            startDate: rangeStart,
          });

          if (i < sortedDates.length) {
            rangeStart = currentDate;
          }
        }

        prevDate = currentDate;
      }

      const startDates = selectedCellsDateRanges.map(
        (range) => range.startDate,
      );
      const endDates = selectedCellsDateRanges.map((range) => range.endDate);

      return {
        endDates,
        startDates,
      };
    },
    [],
  );

  return (
    <MulticalendarContext.Provider
      value={{
        allBookingsApiData,
        allBookingsApiIsLoading,
        allBookingsApiIsSuccess,
        blockedDates,
        calendarEndMonth,
        calendarStartMonth,
        events,
        formatSelectedDates,
        getBlockOutDatesApiData,
        getBlockOutDatesApiIsLoading,
        getBlockOutDatesApiIsSuccess,
        getBlockOutDatesApiRefetch,
        getConsecutiveDateRanges,
        getPriceForDate,
        minMaxSelectedDatePrice,
        propertyPricingInfoApiData,
        propertyPricingInfoApiIsLoading,
        propertyPricingInfoApiIsSuccess,
        propertyPricingInfoApiRefetch,
        selectedCells,
        selectedDaysType,
        selectedPropertyValue,
        setBlockedDates,
        setEvents,
        setSelectedCells,
        setSelectedPropertyValue,
        todaysDate,
        weekdayPrice,
        weekendPrice,
      }}
    >
      {children}
    </MulticalendarContext.Provider>
  );
}
