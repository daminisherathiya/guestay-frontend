import { useEffect, useState } from "react";

import { amenitiesApi } from "@/apis/property/amenitiesApi";
import {
  AmeinityType,
  amenitiesAPIResponseType,
} from "@/apis/property/amenitiesApi/amenitiesApi.types";
import { locationsApi } from "@/apis/property/locationsApi";
import { locationsAPIResponseType } from "@/apis/property/locationsApi/locationsApi.types";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useFullReceiptPreviewDialogProps } from "./FullReceiptPreviewDialog.types";

export function useFullReceiptPreviewDialog({
  property,
  propertyApiIsSuccess,
}: useFullReceiptPreviewDialogProps) {
  const {
    data: amenitiesApiData,
    isSuccess: amenitiesApiIsSuccess,
    isFirstLoading: amenitiesApiIsFirstLoading,
  } = useQuery<amenitiesAPIResponseType, Error, amenitiesAPIResponseType>({
    queryFn: () => {
      return amenitiesApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["amenities"],
  });

  const [selectedAmenities, setSelectedAmenities] = useState<AmeinityType[]>(
    [],
  );

  useEffect(() => {
    if (amenitiesApiIsSuccess && propertyApiIsSuccess && property) {
      const selectedAmenitiesArray = property.amenities.split(",").map(Number);
      setSelectedAmenities(
        amenitiesApiData?.data.filter((amenity) =>
          selectedAmenitiesArray.includes(Number(amenity.id)),
        ),
      );
    }
  }, [amenitiesApiIsSuccess, property, amenitiesApiData, propertyApiIsSuccess]);

  ////////

  const { data: locationsApiData, isFirstLoading: locationsApiIsFirstLoading } =
    useQuery<locationsAPIResponseType, Error, locationsAPIResponseType>({
      initialData: { data: [] },
      queryFn: () => {
        return locationsApi({ data: { userId: getUserDetails().id } });
      },
      queryKey: ["locations"],
    });

  ////////

  const isLoading = amenitiesApiIsFirstLoading || locationsApiIsFirstLoading;

  return {
    isLoading,
    locationsApiData,
    selectedAmenities,
  };
}
