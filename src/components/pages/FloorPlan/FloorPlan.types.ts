export interface CounterItem {
  field: keyof CounterState;
  max: number;
  name: string;
}

export interface CounterState {
  bathrooms: number;
  cribs: number;
}

export interface BedroomFormValues {
  bedrooms: {
    bed_count: string;
    display_order: string;
    name: string;
    type: { id: string; num_of_beds: string; num_of_people: string }[];
  }[];
}