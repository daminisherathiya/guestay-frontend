"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Slider } from "@mui/material";
import { Controller } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";
import { usePrice } from "@/components/pages/Price/Price.hooks";
import { numericValue, removeLeadingZeros } from "@/utils/common";

import { useDiscountsMonthly } from "./DiscountsMonthly.hooks";

const discountSliderMarks = [
  { label: "0%", value: 0 },
  { label: "99%", value: 99 },
];

export function DiscountsMonthly() {
  const {
    commissionRate,
    handleInput,
    insurancePolicyPrice,
    isLoading,
    price,
    priceError,
  } = usePrice();

  const {
    control,
    discountedCommissionRates,
    discountedPrice,
    discountPercentage,
    handleDiscountSliderChange,
  } = useDiscountsMonthly({ commissionRate, price });

  const { propertyId }: { propertyId: string } = useParams();

  return (
    <>
      <Typography className="mb-0.5 text-center font-medium">
        Monthly discount
      </Typography>
      <Typography
        className="mb-8 text-center text-text-secondary"
        variant="body2"
      >
        Average for a 30-night stay
      </Typography>

      <PriceWithTaxCalculation
        hideLearnMore
        priceEditable
        commissionPrice={discountedCommissionRates}
        handleInput={handleInput}
        insurancePolicyPrice={insurancePolicyPrice}
        isLoading={isLoading}
        price={discountedPrice.toString()}
        priceError={priceError}
        priceVisibleInitialValue={false}
      />
      <Stack className="mt-16 flex-row items-center justify-between gap-6">
        <Box>
          <Typography className="font-medium">Set a discount</Typography>
          <Typography className="text-xs" variant="body2">
            Tip: To attract monthly stays, try 49%
          </Typography>
          <Button className="p-0 text-xs">Learn more</Button>
        </Box>
        <Controller
          control={control}
          name="monthlyDiscount"
          render={({ field }) => (
            <TextField
              {...field}
              autoComplete="off"
              className="shrink-0"
              id="outlined-basic"
              slotProps={{
                htmlInput: {
                  "aria-labelledby": "input-slider",
                  max: 99,
                  min: 0,
                },
                input: {
                  classes: {
                    input: "w-6 py-2 pl-3 text-right",
                  },
                  className:
                    "pl-0 font-bold bg-common-white rounded-lg text-lg pr-3",
                  endAdornment: (
                    <Typography className="text-lg font-bold">%</Typography>
                  ),
                  inputProps: { maxLength: 2 },
                },
              }}
              value={discountPercentage}
              variant="outlined"
              onChange={(e) => {
                const value = numericValue(removeLeadingZeros(e.target.value));
                const clampedValue = Math.max(
                  0,
                  Math.min(99, Number(value) || 0),
                );
                const discountInputValue = value ? clampedValue : "";
                field.onChange(discountInputValue);
                handleDiscountSliderChange(Number(discountInputValue));
              }}
            />
          )}
          rules={{
            validate: (value) => value <= 99 || "Max value is 99",
          }}
        />
      </Stack>

      <Slider
        aria-label="Discount slider"
        aria-labelledby="input-slider"
        classes={{
          mark: "hidden",
          markLabel: "text-xs translate-x-0",
        }}
        className="mt-6"
        defaultValue={49}
        marks={discountSliderMarks}
        max={99}
        sx={{
          "& .MuiSlider-markLabel[data-index='1']": {
            left: "auto !important",
            right: "0% !important",
          },
        }}
        value={discountPercentage}
        valueLabelDisplay="auto"
        onChange={(_, value) =>
          handleDiscountSliderChange(Array.isArray(value) ? value[0] : value)
        }
      />
      <Stack className="mt-8 gap-3">
        <Button className="w-full" size="large" variant="contained">
          Save
        </Button>
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
