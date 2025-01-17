import { Dispatch, SetStateAction } from "react";

export interface useGlobalPricesProps {
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
}
