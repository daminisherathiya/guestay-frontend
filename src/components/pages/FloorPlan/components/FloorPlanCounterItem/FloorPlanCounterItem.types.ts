import { CounterItem, CounterState } from "../../FloorPlan.types";

export interface FloorPlanCounterItemProps {
  counter: number;
  displayValue: (value: number) => number;
  floorPlanItem: CounterItem;
  handleDecrease: (field: keyof CounterState) => void;
  handleIncrease: (field: keyof CounterState, maxLimit: number) => void;
  isLoading: boolean;
}
