"use client";

import Link from "next/link";

import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";
import { usePrice } from "@/components/pages/Price/Price.hooks";

export function WeekendPricing() {
  const {
    commissionPrice,
    handleInput,
    insurancePolicyPrice,
    isLoading,
    price,
    priceError,
  } = usePrice();

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
        isLoading={isLoading}
        price={price}
        priceError={priceError}
      />
      <Stack className="mt-8 gap-3">
        <Button className="w-full" size="large" variant="contained">
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
