import { useRef, useState } from "react";

import { globalPricesApiResponseType } from "@/apis/property/amenitiesApi/amenitiesApi.type";
import { globalPricesApi } from "@/apis/property/globalPricesApi";
import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useQuery } from "@/hooks/useQuery";
import { useToggle } from "@/hooks/useToggle/useToggle";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function usePrice() {
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

  const [value, setValue] = useState<string>("2,439");
  const [expanded, setExpanded] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  return {
    expanded,
    globalPricesApiData,
    globalPricesApiIsFirstLoading,
    globalPricesApiSnackbarAlert,
    handleEditClick,
    handleInput,
    inputRef,
    isEditing,
    isPriceVisible,
    moreAboutPricingDialogIsOpen,
    setIsEditingFalse,
    setIsEditingTrue,
    setIsPriceVisibleTrue,
    setMoreAboutPricingDialogIsOpenFalse,
    setMoreAboutPricingDialogIsOpenTrue,
    toggleExpansion,
    value,
  };
}
