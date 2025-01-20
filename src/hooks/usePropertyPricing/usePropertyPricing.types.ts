export type PricingType = "weekday" | "weekend" | "seasonal";

export interface usePropertyPricingProps {
  pricing: PricingType;
}

export interface onSubmitProps {
  seasonalWeekdayPrice?: string;
  seasonalWeekendPrice?: string;
}

export interface getInitialPriceProps {
  pricing: PricingType;
}
