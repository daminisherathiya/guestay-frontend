import { useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { locationsApi } from "@/apis/property/locationsApi";
import {
  LocationType,
  locationsAPIResponseType,
} from "@/apis/property/locationsApi/locationsApi.types";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import { type AddressDetailsType } from "@/types/Location.types";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { INITIAL_MAP_POSITION } from "./components/DraggableMap/DraggableMap.consts";
import { LocationFormType } from "./Location.types";

export function useLocation() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
    SavePropertyApiSnackbarAlert,
  } = usePropertyToEdit();

  ////////

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

  const {
    control,
    // formState: { isValid },
    // handleSubmit,
    // trigger,
    setValue,
    watch,
  } = useForm<LocationFormType>({
    defaultValues: {
      address: "",
      locationId: null,
    },
    mode: "onChange",
  });

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (locationsApiIsSuccess && propertyApiIsSuccess) {
      setValue("address", propertyApiData?.data.property[0].address || "");
      setValue(
        "locationId",
        propertyApiData?.data.property[0].location || null,
      );
      setLatitude(
        parseFloat(
          propertyApiData?.data.property[0].latitude ||
            String(INITIAL_MAP_POSITION.lat),
        ),
      );
      setLongitude(
        parseFloat(
          propertyApiData?.data.property[0].longitude ||
            String(INITIAL_MAP_POSITION.lng),
        ),
      );
    }
  }, [locationsApiIsSuccess, propertyApiData, propertyApiIsSuccess, setValue]);

  const address = watch("address");
  console.log("🚀 ~ useLocation ~ address:", address);
  const locationId = watch("locationId");
  console.log("🚀 ~ useLocation ~ locationId:", locationId);

  const location = useMemo(() => {
    if (!locationId) {
      return null;
    }

    return locations.find((location) => location.id === locationId) || null;
  }, [locationId, locations]);

  const [locationHasChanged, setLocationHasChanged] = useState(false);

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        address: address,
        latitude: latitude || INITIAL_MAP_POSITION.lat,
        listingStep: "location",
        location: locationId as string,
        longitude: longitude || INITIAL_MAP_POSITION.lng,
        propertyId: propertyId,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading =
    propertyApiIsFirstLoading ||
    locationsApiIsFirstLoading ||
    !address ||
    !locationId ||
    locationId === "0";

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(nextUrl);
    }
  }, [nextUrl, router, savePropertyApiIsSuccess]);

  return {
    control,
    Footer,
    latitude,
    location,
    locationHasChanged,
    locations,
    locationsApiIsFirstLoading,
    LocationsApiSnackbarAlert,
    longitude,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    selectedPlaceDetails,
    setLatitude,
    setLocationHasChanged,
    setLongitude,
    setSelectedPlaceDetails,
  };
}
