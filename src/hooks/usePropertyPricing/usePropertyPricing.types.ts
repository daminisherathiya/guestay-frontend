export type PricingType =
  | "weekday"
  | "weekend"
  | "seasonal_weekday"
  | "seasonal_weekend";

export interface usePropertyPricingProps {
  pricing: PricingType;
}

export interface onSubmitProps {
  seasonalWeekdayPrice?: string;
  seasonalWeekendPrice?: string;
}
