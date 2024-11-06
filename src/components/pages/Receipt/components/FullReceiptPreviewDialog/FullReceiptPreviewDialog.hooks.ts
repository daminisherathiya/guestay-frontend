import { useEffect, useState } from "react";

import { amenitiesApi } from "@/apis/property/amenitiesApi";
import {
  AmeinityType,
  amenitiesAPIResponseType,
} from "@/apis/property/amenitiesApi/amenitiesApi.type";
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
    SnackbarAlert: AmenitiesApiSnackbarAlert,
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

  return {
    amenitiesApiIsFirstLoading,
    AmenitiesApiSnackbarAlert,
    selectedAmenities,
  };
}
