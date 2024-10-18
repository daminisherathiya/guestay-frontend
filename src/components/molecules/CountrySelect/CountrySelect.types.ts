export interface CountrySelectProps {
  focusedInputIndex?: number | null;
  index?: number;
  totalFields?: number;
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
