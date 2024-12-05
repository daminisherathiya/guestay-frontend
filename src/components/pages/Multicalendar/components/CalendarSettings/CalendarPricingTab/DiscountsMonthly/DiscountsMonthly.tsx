"use client";

import { useState } from "react";

import { Slider } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { PriceWithTaxCalculation } from "@/components/organisms/PriceWithTaxCalculation";
import { usePrice } from "@/components/pages/Price/Price.hooks";
import { removeLeadingZeros } from "@/utils/common";

const marks = [
  {
    label: "0%",
    value: 0,
  },
  {
    label: "99%",
    value: 99,
  },
];

export function DiscountsMonthly() {
  const {
    commissionRates,
    handleInput,
    insurancePolicyPrice,
    isLoading,
    price,
    priceError,
  } = usePrice();

  const { control } = useForm({
    defaultValues: {
      monthlyDiscount: 15,
    },
  });

  const [value, setValue] = useState(30);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <>
      <Typography className="mb-0.5 text-center font-medium">
        Weekly discount
      </Typography>
      <Typography
        className="mb-8 text-center text-text-secondary"
        variant="body2"
      >
        Average for a 7-night stay
      </Typography>
      <PriceWithTaxCalculation
        commissionRates={commissionRates}
        handleInput={handleInput}
        hideLearnMore={true}
        insurancePolicyPrice={insurancePolicyPrice}
        isLoading={isLoading}
        price={price}
        priceError={priceError}
      />
      <Stack className="mt-16 flex-row items-center justify-between gap-6">
        <Box>
          <Typography className="font-medium">Set a discount</Typography>
          <Typography className="text-xs" variant="body2">
            Tip: To attract weekly stays, try 21%
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
              value={value}
              variant="outlined"
              onBlur={handleBlur}
              // disabled={!isWeeklyDiscountEnabled}
              // onChange={handleInputChange}
              onChange={(e) => {
                field.onChange(removeLeadingZeros(e.target.value));
                handleInputChange(e);
              }}
            />
          )}
          rules={{
            pattern: /^[0-9]{1,2}$/,
            validate: (value) => value <= 99 || "Max value is 99",
          }}
        />
      </Stack>
      <Slider
        aria-label="Default"
        aria-labelledby="input-slider"
        classes={{
          mark: "hidden",
          markLabel: "text-xs translate-x-0",
          // thumb: "translate-x-0 -translate-y-1/2",
        }}
        defaultValue={50}
        marks={marks}
        max={99}
        sx={{
          "& .MuiSlider-markLabel[data-index='1']": {
            left: "auto !important",
            right: "0% !important",
          },
        }}
        value={typeof value === "number" ? value : 0}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
      />
      <Stack className="mt-8 gap-3">
        <Button className="w-full" size="large" variant="contained">
          Save
        </Button>
        <Button
          className="w-full border-primary-main"
          size="large"
          variant="outlined"
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
