import { Dispatch, SetStateAction } from "react";

export interface CounterWithLabelProps {
  classes: { counterWithLabel?: string; label?: string };
  counter: number;
  description?: string;
  isLoading: boolean;
  label: string;
  maxCount?: number;
  minCount?: number;
  setCounters: Dispatch<SetStateAction<number>>;
  steps?: number;
}

export interface useCounterWithLabelProps {
  maxCount: number;
  minCount: number;
  setCounters: Dispatch<SetStateAction<number>>;
  steps: number;
}
