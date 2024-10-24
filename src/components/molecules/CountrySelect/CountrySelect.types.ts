import { SyntheticEvent } from "react";

export interface CountryType {
  code: string;
  label: string;
  phone: string;
}

export interface CountrySelectProps {
  onChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: CountryType | null,
  ) => void;
  value: CountryType;
}
