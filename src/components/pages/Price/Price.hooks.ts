import { ChangeEvent, useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { globalPricesApi } from "@/apis/property/globalPricesApi";
import {
  GlobalPriceType,
  globalPricesApiResponseType,
} from "@/apis/property/globalPricesApi/globalPricesApi.types";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import { removeLeadingZeros, roundNumber } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { DEFAULT_PRICE } from "./Price.consts";
import { formatNumberWithCommas } from "./Price.utils";

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
    data: globalPricesApiData,
    isFirstLoading: globalPricesApiIsFirstLoading,
    isSuccess: globalPricesApiIsSuccess,
  } = useQuery<globalPricesApiResponseType, Error, globalPricesApiResponseType>(
    {
      initialData: { data: [] },
      queryFn: () => {
        return globalPricesApi({ data: { userId: getUserDetails().id } });
      },
      queryKey: ["global-prices"],
    },
  );

  const [commissionRate, setCommissionRate] = useState<string>("0");
  const [insurancePolicyPrice, setInsurancePolicyPrice] = useState<string>("0");

  useEffect(() => {
    if (globalPricesApiIsSuccess) {
      const commissionRateItem = globalPricesApiData.data.find(
        (item: GlobalPriceType) => item.name === "commission_rate",
      );
      setCommissionRate(commissionRateItem?.value ?? "0");

      const insurancePolicyPriceItem = globalPricesApiData.data.find(
        (item: GlobalPriceType) => item.name === "insurance_policy_price",
      );
      setInsurancePolicyPrice(insurancePolicyPriceItem?.value ?? "0");
    }
  }, [
    globalPricesApiData,
    globalPricesApiIsSuccess,
    setCommissionRate,
    setInsurancePolicyPrice,
  ]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    e.target.value = value;
    setPrice(formatNumberWithCommas(removeLeadingZeros(value)));
  };

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

  const priceError =
    parseFloat(price.replace(/,/g, "")) < 50
      ? "The price should be at least $50"
      : "";

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
    commissionRates: roundNumber(
      parseFloat(price.replace(/,/g, "")) * (parseFloat(commissionRate) / 100),
    ),
    Footer,
    handleInput,
    insurancePolicyPrice: insurancePolicyPrice,
    isLoading,
    price,
    priceError,
  };
}
