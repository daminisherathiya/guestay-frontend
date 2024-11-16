"use client";

import { useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import { listingPropertiesApi } from "@/apis/property/listingPropertiesApi";
import { listingPropertiesApiResponseType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import {
  checkIfPropertyIsFinished,
  getNextListingStepUrl,
} from "./ListingHome.utils";

export function useListingHome() {
  const router = useRouter();

  const { toggle: toggleUnfihishedShowMore, value: showMoreUnfihished } =
    useToggle({
      initialValue: true,
    });

  const { toggle: toggleFihishedShowMore, value: showMoreFihished } = useToggle(
    {
      initialValue: true,
    },
  );

  const {
    data: listingPropertiesApiData,
    isFirstLoading: listingPropertiesApiIsFirstLoading,
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

  const listingUnfinishedProperties = useMemo(() => {
    const properties = (listingPropertiesApiData?.data || []).filter(
      (listingProperty) => !checkIfPropertyIsFinished({ listingProperty }),
    );
    return properties.map((property) => {
      return {
        ...property,
        nextListingStepUrl: getNextListingStepUrl({
          propertyIdToEdit: property.id,
          providedListingSteps: property.listing_steps || "",
        }),
      };
    });
  }, [listingPropertiesApiData]);

  useEffect(() => {
    listingUnfinishedProperties.forEach((property) =>
      router.prefetch(property.nextListingStepUrl),
    );
  }, [listingUnfinishedProperties, router]);

  const listingFinishedProperties = useMemo(() => {
    const properties = (listingPropertiesApiData?.data || []).filter(
      (listingProperty) => checkIfPropertyIsFinished({ listingProperty }),
    );
    return properties.map((property) => {
      return {
        ...property,
        nextListingStepUrl: getNextListingStepUrl({
          propertyIdToEdit: property.id,
          providedListingSteps: property.listing_steps || "",
        }),
      };
    });
  }, [listingPropertiesApiData]);

  useEffect(() => {
    listingFinishedProperties.forEach((property) =>
      router.prefetch(property.nextListingStepUrl),
    );
  }, [listingFinishedProperties, router]);

  return {
    listingFinishedProperties,
    listingPropertiesApiIsFirstLoading,
    listingUnfinishedProperties,
    router,
    showMoreFihished,
    showMoreUnfihished,
    toggleFihishedShowMore,
    toggleUnfihishedShowMore,
  };
}
