import { ChangeEvent } from "react";

export interface PriceWithTaxCalculationProps {
  commissionPrice: string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  hideLearnMore?: boolean;
  insurancePolicyPrice: string;
  isLoading: boolean;
  price: string;
  priceEditable?: boolean;
  priceError: string;
  priceVisibleInitialValue?: boolean;
  textSize?: "small" | "large";
}

export interface usePriceWithTaxCalculationProps {
  priceVisibleInitialValue: boolean;
}
