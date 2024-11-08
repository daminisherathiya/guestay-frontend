import { useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { DiscountFormType } from "./Discount.types";

export function useDiscount() {
  const { propertyId }: { propertyId: string } = useParams();

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
      monthlyDiscountChecked: false,
      monthlyDiscountId: "0",

      weeklyDiscount: 8,
      weeklyDiscountChecked: false,
      weeklyDiscountId: "0",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (propertyApiIsSuccess) {
      let monthlyDiscount = 15;
      let monthlyDiscountChecked = false;
      let monthlyDiscountId = "0";

      let weeklyDiscount = 8;
      let weeklyDiscountChecked = false;
      let weeklyDiscountId = "0";

      if (Array.isArray(propertyApiData?.data?.discount)) {
        const discounts = propertyApiData?.data?.discount.reverse();

        const discountForSevenDays = discounts.find(
          (discount) => discount.discount_days === "7",
        );
        weeklyDiscount = discountForSevenDays
          ? parseInt(discountForSevenDays.discount_rate)
          : 8;
        weeklyDiscountId = discountForSevenDays ? discountForSevenDays.id : "0";
        weeklyDiscountChecked = !!weeklyDiscountId;

        ////////

        const discountForTwentyEightDays = discounts.find(
          (discount) => discount.discount_days === "28",
        );
        monthlyDiscount = discountForTwentyEightDays
          ? parseInt(discountForTwentyEightDays.discount_rate)
          : 15;
        monthlyDiscountId = discountForTwentyEightDays
          ? discountForTwentyEightDays.id
          : "0";
        monthlyDiscountChecked = !!monthlyDiscountId;
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

  const weeklyDiscount = watch("weeklyDiscount");
  const weeklyDiscountId = watch("weeklyDiscountId");
  const weeklyDiscountChecked = watch("weeklyDiscountChecked");
  console.log(
    "🚀 ~ useDiscount ~ weeklyDiscountChecked:",
    weeklyDiscountChecked,
  );
  const monthlyDiscount = watch("monthlyDiscount");
  const monthlyDiscountId = watch("monthlyDiscountId");
  const monthlyDiscountChecked = watch("monthlyDiscountChecked");
  console.log(
    "🚀 ~ useDiscount ~ monthlyDiscountChecked:",
    monthlyDiscountChecked,
  );

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
    const discountDays = [];
    const discountIds = [];
    const discountRate = [];

    if (weeklyDiscountChecked) {
      discountDays.push(7);
      discountIds.push(weeklyDiscountId);
      discountRate.push(weeklyDiscount);
    }
    if (monthlyDiscountChecked) {
      discountDays.push(28);
      discountIds.push(monthlyDiscountId);
      discountRate.push(monthlyDiscount);
    }

    savePropertyApiMutate({
      data: {
        discountDays: discountDays,
        discountIds: discountIds,
        discountRate: discountRate,
        listingStep: "discount",
        propertyId: propertyId,
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
    isMonthlyDiscountEnabled: monthlyDiscountChecked,
    isWeeklyDiscountEnabled: weeklyDiscountChecked,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    setDiscountsDialogIsOpenFalse,
    setDiscountsDialogIsOpenTrue,
  };
}
