export interface CounterItem {
  field: keyof CounterState;
  max: number;
  name: string;
}

export interface CounterState {
  bathrooms: number;
  bedrooms: number;
  beds: number;
  cribs: number;
  guests: number;
}
