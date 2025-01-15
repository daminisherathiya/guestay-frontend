import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import { roundNumber } from "@/utils/common";

import { useDiscountsWeeklyProps } from "./DiscountsWeekly.types";

export function useDiscountsWeekly({
  commissionRate,
  price,
}: useDiscountsWeeklyProps) {
  const { control } = useForm({
    defaultValues: {
      monthlyDiscount: 15,
    },
  });

  const [discountPercentage, setDiscountPercentage] = useState<number>(30);

  const handleDiscountSliderChange = (value: number) => {
    setDiscountPercentage(value);
  };

  const discountedPrice = useMemo(() => {
    const numericPrice = parseFloat(price.replace(/,/g, "")) * 7;
    return Math.round(numericPrice * (1 - discountPercentage / 100)) || 0;
  }, [price, discountPercentage]);

  const discountedCommissionRates = useMemo(() => {
    return roundNumber(discountedPrice * (parseFloat(commissionRate) / 100));
  }, [commissionRate, discountedPrice]);

  return {
    control,
    discountedCommissionRates,
    discountedPrice,
    discountPercentage,
    handleDiscountSliderChange,
  };
}
