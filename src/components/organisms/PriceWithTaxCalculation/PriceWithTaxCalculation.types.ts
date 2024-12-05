import { ChangeEvent } from "react";

export interface PriceWithTaxCalculationProps {
  commissionRates: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  hideLearnMore?: boolean;
  insurancePolicyPrice: string;
  isLoading: boolean;
  price: string;
  priceError: string;
  textSize?: "small" | "large";
}
