"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/atoms/Button";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";
import { usePropertyPricing } from "@/hooks/usePropertyPricing";

export function BasePricing() {
  const {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    isDisabled,
    isLoading,
    onSubmit,
    price,
    priceError,
  } = usePropertyPricing({ pricing: "weekday" });

  const { propertyId }: { propertyId: string } = useParams();

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
        <LoadingButton
          className="w-full"
          disabled={isDisabled}
          loading={isLoading}
          loadingIndicator="Saving..."
          size="large"
          type="submit"
          variant="contained"
          onClick={onSubmit}
        >
          Save
        </LoadingButton>
        <Button
          className="w-full border-primary-main"
          component={Link}
          href={`/multicalendar/${propertyId}/pricing-settings`}
          size="large"
          variant="outlined"
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
