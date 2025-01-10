import { Dispatch, SetStateAction } from "react";

export interface useEditSelectedDatesProps {
  selectedCells: string[];
  setBlockedDates: Dispatch<SetStateAction<string[]>>;
  setSelectedCells: Dispatch<SetStateAction<string[]>>;
}
