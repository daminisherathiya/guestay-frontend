"use client";

import { useMemo } from "react";

import { listingPropertiesApi } from "@/apis/property/listingPropertiesApi";
import { listingPropertiesApiResponseType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useListingHome() {
  const { toggle: toggleShowMore, value: showMore } = useToggle({
    initialValue: true,
  });

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
    showMore,
    toggleShowMore,
  };
}
