import { useState } from "react";

import { type AddressDetailsType } from "@/types/Location.types";

export function useLocation() {
  const [selectedPlaceDetails, setSelectedPlaceDetails] =
    useState<AddressDetailsType | null>(null);

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
