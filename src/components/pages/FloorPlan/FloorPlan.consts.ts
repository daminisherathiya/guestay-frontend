import { CounterItem } from "./FloorPlan.types";

export const floorPlanItems: CounterItem[] = [
  { field: "bathrooms", max: 50, name: "Bathrooms" },
  { field: "cribs", max: 50, name: "Cribs" },
];

export const BEDROOMS_INITIAL_VALUE = [
  {
    bed_count: "1",
    display_order: "0",
    name: "Bedroom 1",
    type: [],
  },
];
