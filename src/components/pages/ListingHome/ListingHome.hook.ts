"use client";

import { useRouter } from "next/navigation";

import { listingPropertiesApi } from "@/apis/property/listingPropertiesApi";
import { listingPropertiesApiResponseType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.type";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import {
  getUserDetails,
  setPropertyIdToEdit as setPropertyIdToEditInLocalStorage,
} from "@/utils/localStorage/localStorage";

import { currentStepToNextStepUrl } from "./ListingHome.const";

export function useListingHome() {
  const router = useRouter();

  const { toggle: toggleShowMore, value: showMore } = useToggle({
    initialValue: true,
  });

  const setPropertyIdToEdit = ({
    propertyIdToEdit,
    listing_step,
  }: {
    listing_step: string;
    propertyIdToEdit: string;
  }) => {
    console.log("🚀 ~ useListingHome ~ listing_step:", listing_step);
    setPropertyIdToEditInLocalStorage({ propertyIdToEdit });
    router.push(currentStepToNextStepUrl[listing_step]);
  };

  const {
    data: listingPropertiesApiData,
    isFirstLoading: listingPropertiesApiIsFirstLoading,
    SnackbarAlert: ListingPropertiesApiSnackbarAlert,
  } = useQuery<
    listingPropertiesApiResponseType,
    Error,
    listingPropertiesApiResponseType
  >({
    initialData: { data: [] },
    queryFn: () => {
      return listingPropertiesApi({ data: { userId: getUserDetails().id } });
    },
    queryKey: ["listing-properties"],
  });

  return {
    listingPropertiesApiData,
    listingPropertiesApiIsFirstLoading,
    ListingPropertiesApiSnackbarAlert,
    setPropertyIdToEdit,
    showMore,
    toggleShowMore,
  };
}
