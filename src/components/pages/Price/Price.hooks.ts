import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { globalPricesApi } from "@/apis/property/globalPricesApi";
import { globalPricesApiResponseType } from "@/apis/property/globalPricesApi/globalPricesApi.type";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle/useToggle";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

export function usePrice() {
  const [value, setValue] = useState<string>("2,439");
  const [expanded, setExpanded] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      setValue(propertyApiData?.data[0]?.weekdays_price || "");
    }
  }, [propertyApiData, propertyApiIsSuccess]);

  const {
    data: globalPricesApiData,
    isFirstLoading: globalPricesApiIsFirstLoading,
    // isSuccess: globalPricesApiIsSuccess,
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

  const { value: isPriceVisible, toggle: setIsPriceVisibleTrue } = useToggle({
    initialValue: false,
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
    if (inputRef.current) {
      inputRef.current.focus();
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
    setValue(formatNumberWithCommas(value));
  };
  const toggleExpansion = (buttonIndex: number) => {
    setExpanded(buttonIndex);
  };

  ////////

  const router = useRouter();

  const onSubmit = () => {
    console.log(
      "🚀 ~ onSubmit ~ Number(value):",
      Number(value.replace(/,/g, "")),
    );
    savePropertyApiMutate({
      data: {
        listingStep: "price",
        propertyId: getPropertyIdToEdit() as string,
        userId: getUserDetails().id,
        weekdaysPrice: Number(value.replace(/,/g, "")),
      },
    });
  };

  const isLoading =
    propertyApiIsFirstLoading || globalPricesApiIsFirstLoading || !value;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(nextUrl);
    }
  }, [nextUrl, router, savePropertyApiIsSuccess]);

  return {
    expanded,
    Footer,
    globalPricesApiData,
    globalPricesApiSnackbarAlert,
    handleEditClick,
    handleInput,
    inputRef,
    isEditing,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
    toggleExpansion,
    value,
  };
}
