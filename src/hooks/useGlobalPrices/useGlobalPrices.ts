import { ChangeEvent, useEffect, useState } from "react";

import { globalPricesApi } from "@/apis/property/globalPricesApi";
import {
  GlobalPriceType,
  globalPricesApiResponseType,
} from "@/apis/property/globalPricesApi/globalPricesApi.types";
import { formatNumberWithCommas } from "@/components/pages/Price/Price.utils";
import { useQuery } from "@/hooks/useQuery";
import { removeLeadingZeros, roundNumber } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useGlobalPrices({ price, setPrice }) {
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

  const priceError =
    parseFloat(price.replace(/,/g, "")) < 50
      ? "The price should be at least $50"
      : "";

  return {
    commissionPrice: roundNumber(
      parseFloat(price.replace(/,/g, "")) * (parseFloat(commissionRate) / 100),
    ),
    commissionRate,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice: insurancePolicyPrice,
    priceError,
  };
}
