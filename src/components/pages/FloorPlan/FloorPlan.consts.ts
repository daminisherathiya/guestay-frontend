import { BedroomFormValues } from "./FloorPlan.types";

export const BEDROOMS_INITIAL_VALUE: BedroomFormValues["bedrooms"] = [
  {
    bed_count: "1",
    display_order: "0",
    name: "Bedroom 1",
    type: [], // Will be populated once the API loads
  },
];
