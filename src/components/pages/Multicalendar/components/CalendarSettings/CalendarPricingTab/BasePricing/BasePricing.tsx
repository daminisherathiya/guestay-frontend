"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";
import { useManagePropertyPricing } from "@/hooks/useManagePropertyPricing";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useBasePricing } from "./BasePricing.hooks";

export function BasePricing() {
  const {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    price,
    priceError,
    weekendPrice,
  } = useBasePricing();

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
        weekdaysPrice: price,
        weekendPrice: weekendPrice.toString(),
      },
    });
  };

  return (
    <>
      <Typography className="mb-8 text-center font-medium">
        Per night
      </Typography>
      <PriceWithTaxCalculation
        commissionPrice={commissionPrice}
        handleInput={handleInput}
        insurancePolicyPrice={insurancePolicyPrice}
        isLoading={globalPricesApiIsFirstLoading}
        price={price}
        priceError={priceError}
        priceVisibleInitialValue={false}
      />
      <Stack className="mt-8 gap-3">
        <Button
          className="w-full"
          // disabled={isDisabled}
          // loading={globalPricesApiIsFirstLoading}
          loadingIndicator="Saving..."
          size="large"
          type="submit"
          variant="contained"
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
