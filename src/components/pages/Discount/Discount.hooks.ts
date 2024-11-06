import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

import { DiscountFormType } from "./Discount.types";

export function useDiscount() {
  const {
    value: discountsDialogIsOpen,
    setTrue: setDiscountsDialogIsOpenTrue,
    setFalse: setDiscountsDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

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

  const {
    control,
    // formState: { isValid },
    // handleSubmit,
    // trigger,
    watch,
    reset,
  } = useForm<DiscountFormType>({
    defaultValues: {
      monthlyDiscount: 15,
      monthlyDiscountChecked: true,
      monthlyDiscountId: null,

      weeklyDiscount: 8,
      weeklyDiscountChecked: true,
      weeklyDiscountId: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (propertyApiIsSuccess) {
      let monthlyDiscount = 0;
      const monthlyDiscountChecked = true;
      let monthlyDiscountId = null;

      let weeklyDiscount = 0;
      const weeklyDiscountChecked = true;
      let weeklyDiscountId = null;

      if (Array.isArray(propertyApiData?.data?.discount)) {
        const discounts = propertyApiData?.data?.discount.reverse();

        const discountForSevenDays = discounts.find(
          (discount) => discount.discount_days === "7",
        );
        weeklyDiscount = discountForSevenDays
          ? parseInt(discountForSevenDays.discount_rate)
          : 8;
        weeklyDiscountId = discountForSevenDays
          ? discountForSevenDays.id
          : null;

        const discountForTwentyEightDays = discounts.find(
          (discount) => discount.discount_days === "28",
        );
        monthlyDiscount = discountForTwentyEightDays
          ? parseInt(discountForTwentyEightDays.discount_rate)
          : 15;
        monthlyDiscountId = discountForTwentyEightDays
          ? discountForTwentyEightDays.id
          : null;
      }

      console.log("🚀 ~ useEffect ~ weeklyDiscountId:", weeklyDiscountId);
      console.log("🚀 ~ useEffect ~ monthlyDiscountId:", monthlyDiscountId);

      reset({
        monthlyDiscount: monthlyDiscount,
        monthlyDiscountChecked: monthlyDiscountChecked,
        monthlyDiscountId: monthlyDiscountId,

        weeklyDiscount: weeklyDiscount,
        weeklyDiscountChecked: weeklyDiscountChecked,
        weeklyDiscountId: weeklyDiscountId,
      });
    }
  }, [propertyApiData, propertyApiIsSuccess, reset]);

  const weeklyDiscountId = watch("weeklyDiscountId");
  const monthlyDiscountId = watch("monthlyDiscountId");

  // const handleInput = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   type: "weekly" | "monthly",
  // ) => {
  //   if (!(e.target instanceof HTMLInputElement)) return;

  //   let value = e.target.value;

  //   value = value.replace(/[^0-9]/g, "");
  //   if (value.length > 2) {
  //     value = value.slice(0, 2);
  //   }
  //   e.target.value = value;

  //   if (type === "weekly") {
  //     setWeeklyDiscount(parseInt(value, 10) || 0);
  //   } else if (type === "monthly") {
  //     setMonthlyDiscount(parseInt(value, 10) || 0);
  //   }
  // };

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        discountDays: [7, 28],
        discountIds:
          weeklyDiscountId !== null && monthlyDiscountId !== null
            ? [weeklyDiscountId, monthlyDiscountId]
            : undefined,
        discountRate: [watch("weeklyDiscount"), watch("monthlyDiscount")],
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
    control,
    discountsDialogIsOpen,
    Footer,
    isLoading,
    isMonthlyDiscountEnabled: watch("monthlyDiscountChecked"),
    isWeeklyDiscountEnabled: watch("weeklyDiscountChecked"),
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setDiscountsDialogIsOpenFalse,
    setDiscountsDialogIsOpenTrue,
  };
}
