import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { managePropertyPricingApi } from "@/apis/multiCalendar/managePropertyPricingApi";
import {
  managePropertyPricingApiResponseType,
  managePropertyPricingApiType,
} from "@/apis/multiCalendar/managePropertyPricingApi/managePropertyPricingApi.types";
import { DEFAULT_PRICE } from "@/components/pages/Price/Price.consts";
import { useGlobalPrices } from "@/hooks/useGlobalPrices";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { formatNumberWithCommas, numericValue } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useMutation } from "../useMutation";

import { useWeekdayAndWeekendPriceProps } from "./useWeekdayAndWeekendPrice.types";

export function useWeekdayAndWeekendPrice({
  pricing,
}: useWeekdayAndWeekendPriceProps) {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    propertyPricingInfoApiData,
    propertyPricingInfoApiIsFirstLoading,
    propertyPricingInfoApiIsSuccess,
    setWeekdaysPrice,
    setWeekendPrice,
    weekdaysPrice,
    weekendPrice,
  } = useMulticalendarContext();

  const [price, setPrice] = useState<string>(DEFAULT_PRICE);

  useEffect(() => {
    if (propertyPricingInfoApiData && propertyPricingInfoApiIsSuccess) {
      const selectedPrice =
        pricing === "weekday"
          ? propertyPricingInfoApiData.data.weekdays_price
          : propertyPricingInfoApiData.data.weekend_price;

      setPrice(formatNumberWithCommas(String(parseInt(selectedPrice))));
    }
  }, [propertyPricingInfoApiData, propertyPricingInfoApiIsSuccess, pricing]);

  const {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    priceError,
  } = useGlobalPrices({
    price,
    setPrice,
  });

  const {
    mutate: managePropertyPricingApiMutate,
    isPending: managePropertyPricingApiIsPending,
    isSuccess: managePropertyPricingApiIsSuccess,
  } = useMutation<
    managePropertyPricingApiResponseType,
    Error,
    managePropertyPricingApiType
  >({
    mutationFn: managePropertyPricingApi,
    mutationKey: ["save-property"],
  });

  const onSubmit = () => {
    managePropertyPricingApiMutate({
      data: {
        propertyId: propertyId,
        userId: getUserDetails().id,
        weekdaysPrice:
          pricing === "weekday"
            ? numericValue(price)
            : weekdaysPrice.toString(),
        weekendPrice:
          pricing === "weekend" ? numericValue(price) : weekendPrice.toString(),
      },
    });
  };

  useEffect(() => {
    if (
      !managePropertyPricingApiIsPending &&
      managePropertyPricingApiIsSuccess
    ) {
      const parsedPrice = parseInt(numericValue(price));
      if (pricing === "weekday") {
        setWeekdaysPrice(parsedPrice);
      } else {
        setWeekendPrice(parsedPrice);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    managePropertyPricingApiIsPending,
    managePropertyPricingApiIsSuccess,
    setWeekdaysPrice,
  ]);

  const isDisabled =
    priceError != "" ||
    managePropertyPricingApiIsPending ||
    globalPricesApiIsFirstLoading ||
    propertyPricingInfoApiIsFirstLoading ||
    !propertyPricingInfoApiIsSuccess;

  const isLoading =
    globalPricesApiIsFirstLoading || managePropertyPricingApiIsPending;

  return {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    isDisabled,
    isLoading,
    onSubmit,
    price,
    priceError,
  };
}
