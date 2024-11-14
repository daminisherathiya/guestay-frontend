"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useBoolean } from "@/hooks/useBoolean";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";

import { getNextListingStepUrl } from "../ListingHome/ListingHome.utils";

export function useRedirectToRightPropertyListingUrl() {
  const router = useRouter();

  const { propertyApiData, propertyApiIsSuccess, PropertyApiSnackbarAlert } =
    usePropertyToEdit();

  const {
    value: showError,
    setTrue: setShowErrorTrue,
    setFalse: setShowErrorFalse,
  } = useBoolean({ initialValue: false });

  useEffect(() => {
    if (propertyApiIsSuccess) {
      if (propertyApiData?.data.property.length) {
        const nextListingStepUrl = getNextListingStepUrl({
          propertyIdToEdit: propertyApiData?.data.property[0].id || "",
          providedListingSteps:
            propertyApiData?.data.property[0].listing_steps || "",
        });
        router.push(nextListingStepUrl);
      } else {
        setShowErrorTrue();
        setTimeout(() => {
          router.push("/");
          setShowErrorFalse();
        }, 4000);
      }
    }
  }, [
    propertyApiData,
    propertyApiIsSuccess,
    router,
    setShowErrorTrue,
    setShowErrorFalse,
  ]);

  return { PropertyApiSnackbarAlert, showError };
}
