import { Dispatch, SetStateAction } from "react";

export interface useGlobalPricesProps {
  price: string;
  propertyCommissionRate: string;
  setPrice: Dispatch<SetStateAction<string>>;
}
