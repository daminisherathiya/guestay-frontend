"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Box } from "@mui/material";

import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";
import { usePropertyPricing } from "@/hooks/usePropertyPricing";

export function NightlyPrice() {
  const {
    commissionPrice: seasonalWeekdayCommissionPrice,
    selectedDaysType,
    globalPricesApiIsFirstLoading,
    handleInput: seasonalWeekdayHandleInput,
    insurancePolicyPrice,
    isDisabled,
    isLoading,
    onSubmit,
    price: seasonalWeekdayPrice,
    priceError: seasonalWeekdayPriceError,
    setPrice: seasonalWeekdaySetPrice,
  } = usePropertyPricing({ pricing: "seasonal_weekday" });

  const {
    commissionPrice: seasonalWeekendCommissionPrice,
    handleInput: seasonalWeekendHandleInput,
    price: seasonalWeekendPrice,
    priceError: seasonalWeekendPriceError,
    setPrice: seasonalWeekendSetPrice,
  } = usePropertyPricing({ pricing: "seasonal_weekend" });

  const { propertyId }: { propertyId: string } = useParams();

  useEffect(() => {
    if (selectedDaysType === "weekday") {
      seasonalWeekendSetPrice(seasonalWeekdayPrice);
    }
  }, [seasonalWeekdayPrice, seasonalWeekendSetPrice, selectedDaysType]);

  useEffect(() => {
    if (selectedDaysType === "weekend") {
      seasonalWeekdaySetPrice(seasonalWeekendPrice);
    }
  }, [seasonalWeekendPrice, seasonalWeekdaySetPrice, selectedDaysType]);

  return (
    <>
      {(selectedDaysType === "weekday" || selectedDaysType === "both") && (
        <>
          <Typography className="mb-8 text-center font-medium">
            Weekday price per night
          </Typography>
          <PriceWithTaxCalculation
            commissionPrice={seasonalWeekdayCommissionPrice}
            handleInput={seasonalWeekdayHandleInput}
            insurancePolicyPrice={insurancePolicyPrice}
            isLoading={globalPricesApiIsFirstLoading}
            price={seasonalWeekdayPrice}
            priceError={seasonalWeekdayPriceError}
            priceVisibleInitialValue={false}
          />
          <Divider className="-mx-6 my-8 border border-action-selected" />
        </>
      )}
      {(selectedDaysType === "weekend" || selectedDaysType === "both") && (
        <>
          <Typography className="mb-8 text-center font-medium">
            Weekend price per night
          </Typography>
          <PriceWithTaxCalculation
            commissionPrice={seasonalWeekendCommissionPrice}
            handleInput={seasonalWeekendHandleInput}
            insurancePolicyPrice={insurancePolicyPrice}
            isLoading={globalPricesApiIsFirstLoading}
            price={seasonalWeekendPrice}
            priceError={seasonalWeekendPriceError}
            priceVisibleInitialValue={false}
          />
          <Divider className="-mx-6 my-8 border border-action-selected" />
        </>
      )}

      {selectedDaysType === "notSelected" && (
        <Box className="space-y-2 rounded-2xl border border-divider p-6">
          <Typography variant="body2">Dates</Typography>
          <Typography className="font-medium leading-5">
            Select dates on calendar
          </Typography>
        </Box>
      )}

      <Stack className="mt-8 gap-3">
        <LoadingButton
          className="w-full"
          disabled={isDisabled}
          loading={isLoading}
          loadingIndicator="Saving..."
          size="large"
          type="submit"
          variant="contained"
          onClick={() =>
            onSubmit({
              seasonalWeekdayPrice: seasonalWeekdayPrice,
              seasonalWeekendPrice: seasonalWeekendPrice,
            })
          }
        >
          Save
        </LoadingButton>
        <Button
          className="w-full border-primary-main"
          component={Link}
          href={`/multicalendar/${propertyId}/edit-selected-dates`}
          size="large"
          variant="outlined"
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
