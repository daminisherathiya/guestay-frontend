import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { amenitiesApi } from "@/apis/property/amenitiesApi";
import { amenitiesAPIResponseType } from "@/apis/property/amenitiesApi/amenitiesApi.type";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

export function useAmenities() {
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

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (propertyApiIsSuccess) {
      setSelectedOptions(
        propertyApiData?.data.property[0].amenities.split(",") || [],
      );
    }
  }, [propertyApiData, propertyApiIsSuccess]);

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

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        amenities: selectedOptions.join(","),
        listingStep: "amenities",
        propertyId: getPropertyIdToEdit() as string,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading =
    propertyApiIsFirstLoading || amenitiesApiIsFirstLoading || !selectedOptions;

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
    amenitiesApiData,
    AmenitiesApiSnackbarAlert,
    Footer,
    handleButtonClick,
    isLoading,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    selectedOptions,
  };
}
