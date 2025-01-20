"use client";

import Link from "next/link";

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
    getSelectedDaysType,
    globalPricesApiIsFirstLoading,
    handleInput: seasonalWeekdayHandleInput,
    insurancePolicyPrice,
    isDisabled,
    isLoading,
    onSubmit,
    price: seasonalWeekdayPrice,
    priceError: seasonalWeekdayPriceError,
  } = usePropertyPricing({ pricing: "seasonal" });

  const {
    commissionPrice: seasonalWeekendCommissionPrice,
    handleInput: seasonalWeekendHandleInput,
    price: seasonalWeekendPrice,
    priceError: seasonalWeekendPriceError,
  } = usePropertyPricing({ pricing: "seasonal" });

  return (
    <>
      {(getSelectedDaysType === "weekday" ||
        getSelectedDaysType === "both") && (
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
      {(getSelectedDaysType === "weekend" ||
        getSelectedDaysType === "both") && (
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

      {getSelectedDaysType === "notSelected" && (
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
          href="/multicalendar/256/edit-selected-dates"
          size="large"
          variant="outlined"
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
