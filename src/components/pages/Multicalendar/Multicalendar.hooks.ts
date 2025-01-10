import { useRef, useState } from "react";

import { useParams } from "next/navigation";

import { SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";

import { propertyPricingInfoApi } from "@/apis/multiCalendar/propertyPricingInfoApi";
import {
  Holiday,
  Seasonal,
  propertyPricingInfoApiResponseType,
} from "@/apis/multiCalendar/propertyPricingInfoApi/propertyPricingInfoApi.types";
import { listingPropertiesApi } from "@/apis/property/listingPropertiesApi";
import { listingPropertiesApiResponseType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { CalendarRefType } from "./Multicalendar.types";

export function useMulticalendar() {
  const { propertyId }: { propertyId: string } = useParams();
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [selectedPropertyValue, setSelectedPropertyValue] = useState<number>(
    Number(propertyId),
  );
  const [selectedCalenderViewOptionValue, setSelectedCalenderViewOptionValue] =
    useState<number>(1);

  const {
    data: listingPropertiesApiData,
    isFirstLoading: listingPropertiesApiIsFirstLoading,
  } = useQuery<
    listingPropertiesApiResponseType,
    Error,
    listingPropertiesApiResponseType
  >({
    initialData: { data: [] },
    queryFn: () => {
      return listingPropertiesApi({
        data: {
          status: "'active'",
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["listing-properties", "'active'"],
  });

  const {
    data: propertyPricingInfoApiData,
    isFirstLoading: propertyPricingInfoApiIsFirstLoading,
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

  const handlePropertyChange = (event: SelectChangeEvent<unknown>) => {
    const propertyId = event.target.value as number;
    setSelectedPropertyValue(propertyId);
    window.history.replaceState({}, "", `/multicalendar/${propertyId}`);
  };

  const calendarRef = useRef<CalendarRefType>(null);

  const handleShowOptionChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedCalenderViewOptionValue(event.target.value as number);
    if (calendarRef?.current) {
      if (event.target.value === 1) {
        calendarRef.current.getApi().changeView("multiMonth");
      } else {
        calendarRef.current.getApi().changeView("multiMonthYear");
      }
    }
  };

  const { toggle: toggleCalenderSettings, value: calenderSettings } = useToggle(
    {
      initialValue: true,
    },
  );

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
      console.log("🚀 ~ getPriceForDate ~ specialPricing:", specialPricing);
      if (!("weekend_price" in specialPricing)) {
        return parseInt(specialPricing.price, 10);
      }
      return isWeekend
        ? parseInt(specialPricing?.weekend_price, 10)
        : parseInt(specialPricing.price, 10);
    }
    return isWeekend
      ? parseInt(propertyPricingInfoApiData?.data.weekend_price || "0", 10)
      : parseInt(propertyPricingInfoApiData?.data.weekdays_price || "0", 10);
  };

  return {
    blockedDates,
    calenderSettings,
    getPriceForDate,
    handlePropertyChange,
    handleShowOptionChange,
    listingPropertiesApiData,
    listingPropertiesApiIsFirstLoading,
    propertyPricingInfoApiData,
    propertyPricingInfoApiIsFirstLoading,
    selectedCalenderViewOptionValue,
    selectedCells,
    selectedPropertyValue,
    setBlockedDates,
    setSelectedCells,
    toggleCalenderSettings,
  };
}
