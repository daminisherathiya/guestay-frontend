import { useCallback, useRef, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

import { listingPropertiesApi } from "@/apis/property/listingPropertiesApi";
import { listingPropertiesApiResponseType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { CalendarRefType } from "./Multicalendar.types";

export function useMulticalendar() {
  const {
    blockedDates,
    getPriceForDate,
    isPropertyPricingInfoApiIsLoading,
    selectedCells,
    selectedPropertyValue,
    setSelectedCells,
    setSelectedPropertyValue,
  } = useMulticalendarContext();

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

  const handlePropertyChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      const propertyId = event.target.value as number;
      setSelectedPropertyValue(propertyId);
      setTimeout(() => {
        window.history.replaceState(
          {},
          "",
          `/multicalendar/${propertyId}/pricing-settings`,
        );
      }, 500);
    },
    [setSelectedPropertyValue],
  );

  const calendarRef = useRef<CalendarRefType>(null);

  const handleShowOptionChange = useCallback(
    (event: SelectChangeEvent<unknown>) => {
      setSelectedCalenderViewOptionValue(event.target.value as number);
      if (calendarRef?.current) {
        if (event.target.value === 1) {
          calendarRef.current.getApi().changeView("multiMonth");
        } else {
          calendarRef.current.getApi().changeView("multiMonthYear");
        }
      }
    },
    [],
  );

  const { toggle: toggleCalenderSettings, value: calenderSettings } = useToggle(
    {
      initialValue: true,
    },
  );

  return {
    blockedDates,
    calenderSettings,
    getPriceForDate,
    handlePropertyChange,
    handleShowOptionChange,
    isPropertyPricingInfoApiIsLoading,
    listingPropertiesApiData,
    listingPropertiesApiIsFirstLoading,
    selectedCalenderViewOptionValue,
    selectedCells,
    selectedPropertyValue,
    setSelectedCells,
    toggleCalenderSettings,
  };
}
