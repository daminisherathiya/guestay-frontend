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

import { getNextListingStepUrl } from "./ListingHome.utils";

export function useListingHome() {
  const router = useRouter();

  const { toggle: toggleShowMore, value: showMore } = useToggle({
    initialValue: true,
  });

  const setPropertyIdToEdit = ({
    listingSteps,
    propertyIdToEdit,
  }: {
    listingSteps: string | null;
    propertyIdToEdit: string;
  }) => {
    const nextListingStepUrl = getNextListingStepUrl({
      providedListingSteps: listingSteps || "",
    });

    setPropertyIdToEditInLocalStorage({ propertyIdToEdit });
    router.push(nextListingStepUrl);
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
      (listingProperty) =>
        listingProperty.status === "draft" &&
        !(listingProperty.listing_steps || "").includes("draft"),
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
