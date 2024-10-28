import { useState } from "react";

import { locationsApi } from "@/apis/property/locationsApi";
import { locationsAPIResponseType } from "@/apis/property/locationsApi/locationsApi.type";
import { useQuery } from "@/hooks/useQuery";
import { type AddressDetailsType } from "@/types/Location.types";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useLocation() {
  const [selectedPlaceDetails, setSelectedPlaceDetails] =
    useState<AddressDetailsType | null>(null);

  const {
    data: locationsApiData,
    isFirstLoading: locationsApiIsFirstLoading,
    isSuccess: locationsApiIsSuccess,
    SnackbarAlert: LocationsApiSnackbarAlert,
  } = useQuery<locationsAPIResponseType, Error, locationsAPIResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return locationsApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["locations"],
  });

  return {
    locationsApiData,
    locationsApiIsFirstLoading,
    LocationsApiSnackbarAlert,
    selectedPlaceDetails,
    setSelectedPlaceDetails,
  };
}
