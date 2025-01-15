import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import { roundNumber } from "@/utils/common";

import { useDiscountsMonthlyProps } from "./DiscountsMonthly.types";

export function useDiscountsMonthly({
  commissionRate,
  price,
}: useDiscountsMonthlyProps) {
  const { control } = useForm({
    defaultValues: {
      monthlyDiscount: 15,
    },
  });

  const [discountPercentage, setDiscountPercentage] = useState<number>(49);

  const handleDiscountSliderChange = (value: number) => {
    setDiscountPercentage(value);
  };

  const discountedPrice = useMemo(() => {
    const numericPrice = parseFloat(price.replace(/,/g, "")) * 30;
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
