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
    bedroomCount: string;
    bedroomName: string;
    bedroomTypes: { id: string; num_of_beds: string; num_of_people: string }[];
    displayOrder: string;
  }[];
}
