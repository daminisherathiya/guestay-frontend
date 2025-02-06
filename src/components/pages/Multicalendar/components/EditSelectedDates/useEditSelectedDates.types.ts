import { Dispatch, SetStateAction } from "react";

export interface useEditSelectedDatesProps {
  blockedDates: string[];
  minMaxSelectedDatePrice: () => {
    maxPrice: number;
    minPrice: number;
  };
  selectedCells: string[];
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
}
