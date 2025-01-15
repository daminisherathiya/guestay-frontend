import { type AvailabilityOptionsType } from "../CalendarAvailabilityTab.types";

export interface DropdownWithOptionsProps {
  descriptions: string;
  options: AvailabilityOptionsType;
  title: string;
}

export interface useDropdownWithOptionsProps {
  options: AvailabilityOptionsType;
}
