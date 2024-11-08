import { useEffect, useRef, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { globalPricesApi } from "@/apis/property/globalPricesApi";
import {
  GlobalPriceType,
  globalPricesApiResponseType,
} from "@/apis/property/globalPricesApi/globalPricesApi.types";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle/useToggle";
import { removeLeadingZeros, roundNumber } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { DEFAULT_PRICE } from "./Price.consts";

export function usePrice() {
  const { propertyId }: { propertyId: string } = useParams();

  const [price, setPrice] = useState<string>(DEFAULT_PRICE);
  const priceInputRef = useRef<HTMLInputElement | null>(null);

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
    SavePropertyApiSnackbarAlert,
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
    SnackbarAlert: globalPricesApiSnackbarAlert,
  } = useQuery<globalPricesApiResponseType, Error, globalPricesApiResponseType>(
    {
      initialData: { data: [] },
      queryFn: () => {
        return globalPricesApi({ data: { userId: getUserDetails().id } });
      },
      queryKey: ["global-prices"],
    },
  );

  const commissionRatesRef = useRef<string>("0");
  const insurancePolicyPriceRef = useRef<string>("0");

  useEffect(() => {
    if (globalPricesApiIsSuccess) {
      const commissionRateItem = globalPricesApiData.data.find(
        (item: GlobalPriceType) => item.name === "commission_rate",
      );
      commissionRatesRef.current = commissionRateItem?.value ?? "0";

      const insurancePolicyPriceItem = globalPricesApiData.data.find(
        (item: GlobalPriceType) => item.name === "insurance_policy_price",
      );
      insurancePolicyPriceRef.current = insurancePolicyPriceItem?.value ?? "0";
    }
  }, [globalPricesApiData, globalPricesApiIsSuccess]);

  const { value: isPriceVisible, toggle: setIsPriceVisibleTrue } = useToggle({
    initialValue: true,
  });

  const {
    value: isEditing,
    setTrue: setIsEditingTrue,
    setFalse: setIsEditingFalse,
  } = useBoolean({ initialValue: false });

  const {
    value: moreAboutPricingDialogIsOpen,
    setTrue: setMoreAboutPricingDialogIsOpenTrue,
    setFalse: setMoreAboutPricingDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const handleEditClick = () => {
    setIsEditingTrue();
    if (priceInputRef.current) {
      priceInputRef.current.focus();
    }
  };

  const formatNumberWithCommas = (num: string) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      parseFloat(price.replace(/,/g, "")) *
        (parseFloat(commissionRatesRef.current) / 100),
    ),
    Footer,
    globalPricesApiData,
    globalPricesApiSnackbarAlert,
    handleEditClick,
    handleInput,
    insurancePolicyPrice: insurancePolicyPriceRef.current,
    isEditing,
    isLoading,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    price,
    priceError,
    priceInputRef,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
  };
}
