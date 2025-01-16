import { useEffect, useState } from "react";

import { DEFAULT_PRICE } from "@/components/pages/Price/Price.consts";
import { useGlobalPrices } from "@/hooks/useGlobalPrices";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";

export function useBasePricing() {
  const { weekdaysPrice, weekendPrice } = useMulticalendarContext();
  const [price, setPrice] = useState<string>(DEFAULT_PRICE);

  useEffect(() => {
    setPrice(weekdaysPrice.toString());
  }, [weekdaysPrice]);

  const {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    priceError,
  } = useGlobalPrices({ price, setPrice });

  return {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    price,
    priceError,
    weekendPrice,
  };
}
