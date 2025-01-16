"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";
import { useManagePropertyPricing } from "@/hooks/useManagePropertyPricing";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useWeekendPricing } from "./WeekendPricing.hooks";

export function WeekendPricing() {
  const {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    price,
    priceError,
    weekdaysPrice,
  } = useWeekendPricing();

  const {
    managePropertyPricingApiIsPending,
    managePropertyPricingApiIsSuccess,
    managePropertyPricingApiMutate,
  } = useManagePropertyPricing();

  const { propertyId }: { propertyId: string } = useParams();

  const onSubmit = () => {
    managePropertyPricingApiMutate({
      data: {
        propertyId: propertyId,
        userId: getUserDetails().id,
        weekdaysPrice: weekdaysPrice.toString(),
        weekendPrice: price,
      },
    });
  };

  return (
    <>
      <Typography className="mb-0.5 text-center font-medium">
        Custom weekend price
      </Typography>
      <Typography
        className="mb-8 text-center text-text-secondary"
        variant="body2"
      >
        Fri and Sat nights
      </Typography>
      <PriceWithTaxCalculation
        commissionPrice={commissionPrice}
        handleInput={handleInput}
        insurancePolicyPrice={insurancePolicyPrice}
        isLoading={globalPricesApiIsFirstLoading}
        price={price}
        priceError={priceError}
      />
      <Stack className="mt-8 gap-3">
        <Button
          className="w-full"
          loadingIndicator="Saving..."
          size="large"
          type="submit"
          variant="contained"
          // disabled={isDisabled}
          // loading={globalPricesApiIsFirstLoading}
          onClick={onSubmit}
        >
          Save
        </Button>
        <Button
          className="w-full border-primary-main"
          component={Link}
          href="/multicalendar/256/pricing-settings"
          size="large"
          variant="outlined"
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
