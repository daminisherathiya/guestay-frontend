import { useState } from "react";

import { amenitiesApi } from "@/apis/property/amenitiesApi";
import { amenitiesAPIResponseType } from "@/apis/property/amenitiesApi/amenitiesApi.type";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useAmenities() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((option) => option !== value),
      );
    } else {
      setSelectedOptions((prevSelected) => [...prevSelected, value]);
    }
  };

  const {
    data: amenitiesApiData,
    isFirstLoading: amenitiesApiIsFirstLoading,
    SnackbarAlert: AmenitiesApiSnackbarAlert,
  } = useQuery<amenitiesAPIResponseType, Error, amenitiesAPIResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return amenitiesApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["amenities"],
  });

  return {
    amenitiesApiData,
    amenitiesApiIsFirstLoading,
    AmenitiesApiSnackbarAlert,
    handleButtonClick,
    selectedOptions,
  };
}
