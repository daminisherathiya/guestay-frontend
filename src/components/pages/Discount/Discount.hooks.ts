import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

export function useDiscount() {
  const {
    value: discountsDialogIsOpen,
    setTrue: setDiscountsDialogIsOpenTrue,
    setFalse: setDiscountsDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const {
    // propertyApiData,
    propertyApiIsFirstLoading,
    // propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
    SavePropertyApiSnackbarAlert,
  } = usePropertyToEdit();

  const [weeklyDiscount, setWeeklyDiscount] = useState(8);
  const [monthlyDiscount, setMonthlyDiscount] = useState(15);

  // useEffect(() => {
  //   if (propertyApiIsSuccess) {
  //     setWeeklyDiscount(propertyApiData?.data[0]?.discount_rate[0] || []);
  //     setMonthlyDiscount(propertyApiData?.data[0]?.discount_rate[1] || []);
  //   }
  // }, [propertyApiData, propertyApiIsSuccess]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "weekly" | "monthly",
  ) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    e.target.value = value;

    if (type === "weekly") {
      setWeeklyDiscount(parseInt(value, 10) || 0);
    } else if (type === "monthly") {
      setMonthlyDiscount(parseInt(value, 10) || 0);
    }
  };

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        discountDays: [7, 30],
        discountRate: [weeklyDiscount, monthlyDiscount],
        listingStep: "discount",
        propertyId: getPropertyIdToEdit() as string,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading;

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
    discountsDialogIsOpen,
    Footer,
    handleInput,
    isLoading,
    monthlyDiscount,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setDiscountsDialogIsOpenFalse,
    setDiscountsDialogIsOpenTrue,
    weeklyDiscount,
  };
}
