import { useMemo, useState } from "react";

import { locationsApi } from "@/apis/property/locationsApi";
import {
  LocationType,
  locationsAPIResponseType,
} from "@/apis/property/locationsApi/locationsApi.type";
import { useQuery } from "@/hooks/useQuery";
import { type AddressDetailsType } from "@/types/Location.types";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useLocation() {
  const [selectedPlaceDetails, setSelectedPlaceDetails] =
    useState<AddressDetailsType | null>(null);

  const {
    data: locationsApiData,
    isFirstLoading: locationsApiIsFirstLoading,
    // isSuccess: locationsApiIsSuccess,
    SnackbarAlert: LocationsApiSnackbarAlert,
  } = useQuery<locationsAPIResponseType, Error, locationsAPIResponseType>({
    initialData: { data: [] },
    queryFn: () => {
      return locationsApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["locations"],
  });

  const locations: LocationType[] = useMemo(() => {
    if (!locationsApiData) {
      return [];
    }

    const locationsWithChildren = locationsApiData.data.map((location) => {
      const childrenLocations: LocationType[] = [];

      (Array.isArray(location.location_ids)
        ? location.location_ids
        : Object.values(location.location_ids)
      ).forEach((childlocationId) => {
        for (const possibleChildlocation of locationsApiData.data) {
          if (
            // location.id !== childlocationId &&
            childlocationId === possibleChildlocation.id
          ) {
            childrenLocations.push(possibleChildlocation);
          }
        }
      });

      return {
        ...location,
        childrenLocations: childrenLocations,
      };
    });

    return locationsWithChildren.flatMap((location) => {
      if (location.parent === "0") {
        return [...location.childrenLocations];
      }
      return [];
    });
  }, [locationsApiData]);

  return {
    locations,
    locationsApiData,
    locationsApiIsFirstLoading,
    LocationsApiSnackbarAlert,
    selectedPlaceDetails,
    setSelectedPlaceDetails,
  };
}
