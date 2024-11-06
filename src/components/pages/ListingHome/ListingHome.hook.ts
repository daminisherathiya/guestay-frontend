"use client";

import { useMemo } from "react";

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
    listingSteps,
    propertyIdToEdit,
  }: {
    listingSteps: string;
    propertyIdToEdit: string;
  }) => {
    console.log("🚀 ~ useListingHome ~ listingSteps:", listingSteps);
    const listingStepsParts = listingSteps.split(",");
    const listingStep = listingStepsParts[listingStepsParts.length - 1];

    setPropertyIdToEditInLocalStorage({ propertyIdToEdit });
    router.push(currentStepToNextStepUrl[listingStep]);
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

  const listingProperties = useMemo(() => {
    return (listingPropertiesApiData?.data || []).filter(
      (listingProperty) => !listingProperty.listing_steps.includes("draft"),
    );
  }, [listingPropertiesApiData]);

  return {
    listingProperties,
    listingPropertiesApiIsFirstLoading,
    ListingPropertiesApiSnackbarAlert,
    setPropertyIdToEdit,
    showMore,
    toggleShowMore,
  };
}
