import { useState } from "react";

import { bedTypesApi } from "@/apis/property/bedTypesApi";
import { bedTypesApiResponseType } from "@/apis/property/bedTypesApi/bedTypesApi.type";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { CounterState } from "./FloorPlan.type";

export function useFloorPlan() {
  const {
    data: bedTypesApiData,
    isFirstLoading: bedTypesApiIsFirstLoading,
    // isSuccess: bedTypesApiIsSuccess,
    SnackbarAlert: BedTypesApiSnackbarAlert,
  } = useQuery<bedTypesApiResponseType, Error, bedTypesApiResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return bedTypesApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["bed-type"],
  });

  const [counters, setCounters] = useState<CounterState>({
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cribs: 1,
    guests: 1,
  });

  const handleIncrease = (field: keyof CounterState, maxLimit: number) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 1
              : prevCounters[field],
        };
      }
    });
  };

  const handleDecrease = (field: keyof CounterState) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 1
              : prevCounters[field],
        };
      }
    });
  };

  const displayValue = (
    value: number,
    max: number,
    field: keyof CounterState,
  ) => {
    return field === "guests" && value === max ? `${value}+` : value;
  };

  return {
    bedTypesApiData,
    bedTypesApiIsFirstLoading,
    BedTypesApiSnackbarAlert,
    counters,
    displayValue,
    handleDecrease,
    handleIncrease,
  };
}
