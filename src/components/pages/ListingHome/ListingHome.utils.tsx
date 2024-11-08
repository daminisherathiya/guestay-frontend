import { ListingPropertiesType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";

import {
  ALL_LISTING_STEPS,
  LISTING_STEP_TO_URL,
  PROPERTY_ID_STR,
} from "./ListingHome.consts";
import {
  findFirstMissingListingStepType,
  getNextListingStepUrlType,
} from "./ListingHome.types";

export const findFirstMissingListingStep = ({
  providedListingSteps,
}: findFirstMissingListingStepType) => {
  const providedSet = new Set(providedListingSteps.split(","));

  for (const step of ALL_LISTING_STEPS) {
    if (!providedSet.has(step)) {
      return step;
    }
  }

  return ALL_LISTING_STEPS[1];
  throw new Error("All listing steps are already completed!");
};

export const getNextListingStepUrl = ({
  propertyIdToEdit,
  providedListingSteps,
}: getNextListingStepUrlType) => {
  const nextListingStep = findFirstMissingListingStep({
    providedListingSteps,
  });
  const nextListingStepMaskedUrl = LISTING_STEP_TO_URL[nextListingStep];
  return nextListingStepMaskedUrl.replace(PROPERTY_ID_STR, propertyIdToEdit);
};

export const checkIfPropertyIsFinished = ({
  listingProperty,
}: {
  listingProperty: ListingPropertiesType;
}) => {
  return !(
    listingProperty.status === "draft" &&
    !(listingProperty.listing_steps || "").includes("draft")
  );
};
