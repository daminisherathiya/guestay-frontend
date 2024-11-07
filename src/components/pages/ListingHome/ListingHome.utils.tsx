import { ALL_LISTING_STEPS, LISTING_STEP_TO_URL } from "./ListingHome.const";
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

  throw new Error("All listing steps are already completed!");
};

export const getNextListingStepUrl = ({
  providedListingSteps,
}: getNextListingStepUrlType) => {
  const nextListingStep = findFirstMissingListingStep({ providedListingSteps });
  return LISTING_STEP_TO_URL[nextListingStep];
};
