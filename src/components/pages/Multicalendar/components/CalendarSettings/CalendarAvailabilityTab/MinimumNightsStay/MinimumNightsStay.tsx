"use client";

import Link from "next/link";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Controller, useForm } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { numericValue, removeLeadingZeros } from "@/utils/common";

export function MinimumNightsStay() {
  const { control } = useForm({
    defaultValues: {
      minimumNightsStay: "1",
    },
    mode: "onChange",
  });

  return (
    <>
      <Typography className="mb-0.5 text-center font-medium">
        Minimum nights
      </Typography>
      <Controller
        control={control}
        name="minimumNightsStay"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            autoComplete="off"
            error={!!error}
            helperText={error ? error.message : ""}
            id="outlined-basic"
            placeholder="1"
            slotProps={{
              formHelperText: { className: "mt-0 mx-2" },
              htmlInput: {
                max: 365,
                min: 0,
              },
              input: {
                classes: {
                  input: "py-0 text-center",
                  notchedOutline: "border-none",
                },
                className: "text-5xl font-bold my-20",
                inputProps: { maxLength: 3 },
              },
            }}
            variant="outlined"
            onChange={(e) => {
              const value = numericValue(removeLeadingZeros(e.target.value));
              const clampedValue = Math.max(0, Math.min(365, Number(value)));
              field.onChange(value ? clampedValue : "");
            }}
          />
        )}
        rules={{
          validate: (value) => {
            return Number(value) >= 1 || "Min value is 1";
          },
        }}
      />
      <Link href="./availability-settings/minimum-stay/custom">
        <Box className="rounded-2xl border border-divider p-6">
          <Stack className="flex-row items-center justify-between">
            <Box>
              <Typography variant="body2">Customise by check-in day</Typography>
            </Box>
            <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
          </Stack>
        </Box>
      </Link>
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
