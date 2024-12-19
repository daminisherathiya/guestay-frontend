import { useRef, useState } from "react";

import { SelectChangeEvent } from "@mui/material";

import { listingPropertiesApi } from "@/apis/property/listingPropertiesApi";
import { listingPropertiesApiResponseType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { CalendarRefType } from "./Multicalendar.types";

export function useMulticalendar() {
  const [selectedPropertyValue, setSelectedPropertyValue] =
    useState<number>(10);
  const [selectedShowOptionValue, setSelectedShowOptionValue] =
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

  const handlePropertyChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedPropertyValue(event.target.value as number);
  };

  const calendarRef = useRef<CalendarRefType>(null);

  const handleShowOptionChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedShowOptionValue(event.target.value as number);
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
      initialValue: false,
    },
  );

  return {
    calenderSettings,
    handlePropertyChange,
    handleShowOptionChange,
    listingPropertiesApiData,
    listingPropertiesApiIsFirstLoading,
    selectedPropertyValue,
    selectedShowOptionValue,
    toggleCalenderSettings,
  };
}
