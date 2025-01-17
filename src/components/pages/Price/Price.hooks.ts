import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { useGlobalPrices } from "@/hooks/useGlobalPrices";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { formatNumberWithCommas, removeLeadingZeros } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { DEFAULT_PRICE } from "./Price.consts";

export function usePrice() {
  const { propertyId }: { propertyId: string } = useParams();

  const [price, setPrice] = useState<string>(DEFAULT_PRICE);

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
  } = usePropertyToEdit();

  useEffect(() => {
    if (propertyApiIsSuccess) {
      let price = "0";
      if (propertyApiData?.data?.property[0].weekdays_price) {
        price = formatNumberWithCommas(
          String(parseInt(propertyApiData?.data?.property[0].weekdays_price)),
        );
        price = price === "0" ? DEFAULT_PRICE : price;
      }
      setPrice(removeLeadingZeros(price));
      console.log("🚀 ~ useEffect ~ price:", price, removeLeadingZeros(price));
    }
  }, [propertyApiData, propertyApiIsSuccess]);

  const {
    commissionPrice,
    commissionRate,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    priceError,
  } = useGlobalPrices({ price, setPrice });

  ////////

  const router = useRouter();

  const onSubmit = () => {
    console.log(
      "🚀 ~ onSubmit ~ Number(value):",
      Number(price.replace(/,/g, "")),
    );
    savePropertyApiMutate({
      data: {
        listingStep: "price",
        propertyId: propertyId,
        userId: getUserDetails().id,
        weekdaysPrice: Number(price.replace(/,/g, "")),
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading || globalPricesApiIsFirstLoading;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading || !!priceError,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(nextUrl);
    }
  }, [nextUrl, router, savePropertyApiIsSuccess]);

  return {
    commissionPrice,
    commissionRate,
    Footer,
    handleInput,
    insurancePolicyPrice: insurancePolicyPrice,
    isLoading,
    price,
    priceError,
  };
}
