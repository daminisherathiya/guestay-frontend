import { useState } from "react";

import { LocationAddressDetails } from "@/types/common.types";

export function useLocation() {
  const [selectedPlaceDetails, setSelectedPlaceDetails] =
    useState<LocationAddressDetails | null>(null);

  const [focusedInputIndex, setFocusedInputIndex] = useState<null | number>(
    null,
  );
  return {
    focusedInputIndex,
    selectedPlaceDetails,
    setFocusedInputIndex,
    setSelectedPlaceDetails,
  };
}
