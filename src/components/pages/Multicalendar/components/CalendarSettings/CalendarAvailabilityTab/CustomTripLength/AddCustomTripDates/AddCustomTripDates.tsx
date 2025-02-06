"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Controller } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { numericValue, removeLeadingZeros } from "@/utils/common";

import { useAddCustomTripDates } from "./AddCustomTripDates.hooks";
export function AddCustomTripDates() {
  const { control } = useAddCustomTripDates();
  const { propertyId }: { propertyId: string } = useParams();

  return (
    <>
      <Link
        passHref
        href={`/multicalendar/${propertyId}/availability-settings/custom-length`}
      >
        <IconButton aria-label="Back" className="-ml-2 size-8" component="a">
          <ArrowBackIosOutlinedIcon className="size-4" />
        </IconButton>
      </Link>
      <Stack className="gap-8">
        <Box className="space-y-2">
          <Typography className="mb-2 mt-6 font-medium" variant="h3">
            Custom trip length
          </Typography>
          <Typography className="text-text-secondary" variant="body2">
            Dec 19 – 20 selected
          </Typography>
        </Box>
        <Link href="./pricing-settings/rates/base">
          <Box className="space-y-2 rounded-2xl border border-divider p-6">
            <Typography variant="body2">Dates</Typography>
            <Typography className="font-medium leading-5">
              Select dates on calendar
            </Typography>
          </Box>
        </Link>
        <Box className="space-y-2 rounded-2xl border border-divider p-6">
          <Typography variant="body2">Minimum nights</Typography>
          <Controller
            control={control}
            name="minimumNightsStay"
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete="off"
                className="shrink-0"
                id="minimumNightsStay"
                slotProps={{
                  htmlInput: {
                    "aria-labelledby": "minimumNightsStay",
                    max: 365,
                    min: 0,
                  },
                  input: {
                    classes: {
                      input: "p-0",
                      notchedOutline: "border-none",
                    },
                    className: "font-medium bg-common-white group",
                    inputProps: { maxLength: 3 },
                  },
                }}
                variant="outlined"
                onChange={(e) => {
                  const value = numericValue(
                    removeLeadingZeros(e.target.value),
                  );
                  const clampedValue = Math.max(
                    0,
                    Math.min(365, Number(value)),
                  );
                  field.onChange(value ? clampedValue : "");
                }}
              />
            )}
            rules={{
              validate: (value) => {
                return (
                  Number(value) >= 1 || "Minimum nights must be at least 1."
                );
              },
            }}
          />
        </Box>
        <Stack className="gap-3">
          <Button
            className="w-full"
            // component={Link}
            // href="./custom-length/add"
            size="large"
            variant="contained"
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
