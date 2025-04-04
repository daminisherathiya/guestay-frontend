import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { usePropertyPricing } from "@/hooks/usePropertyPricing";
import { WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE } from "@/providers/MulticalendarProvider/MulticalendarProvider.consts";

export const useCalendarPricingTab = () => {
  const router = useRouter();

  const {
    onSubmit,
    hasWeekendPrice,
    propertyPricingInfoApiIsLoading,
    managePropertyPricingApiIsPending,
    price,
    setPrice,
    weekdayPrice,
    weekendPrice,
  } = usePropertyPricing({ pricing: "weekend" });

  const [removeWeekendPriceIsTriggered, setRemoveWeekendPriceIsTriggered] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      removeWeekendPriceIsTriggered &&
      price === WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE
    ) {
      onSubmit({});
      setRemoveWeekendPriceIsTriggered(false);
    }
  }, [onSubmit, price, removeWeekendPriceIsTriggered]);

  return {
    hasWeekendPrice,
    managePropertyPricingApiIsPending,
    propertyPricingInfoApiIsLoading,
    removeWeekendPriceIsTriggered,
    router,
    setPrice,
    setRemoveWeekendPriceIsTriggered,
    weekdayPrice,
    weekendPrice,
  };
};
