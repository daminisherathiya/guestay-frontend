"use client";

import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Controller, useForm } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { numericValue, removeLeadingZeros } from "@/utils/common";

import { DayNames } from "./MinimumStayCustom.types";
export function MinimumStayCustom() {
  const { control } = useForm({
    defaultValues: {
      sundays: "",
      mondays: "",
      tuesdays: "",
      wednesdays: "",
      thursdays: "",
      fridays: "",
      saturdays: "",
    },
  });

  const daysMapping: { label: string; name: DayNames }[] = [
    { label: "Sundays", name: "sundays" },
    { label: "Mondays", name: "mondays" },
    { label: "Tuesdays", name: "tuesdays" },
    { label: "Wednesdays", name: "wednesdays" },
    { label: "Thursdays", name: "thursdays" },
    { label: "Fridays", name: "fridays" },
    { label: "Saturdays", name: "saturdays" },
  ];

  return (
    <>
      <IconButton aria-label="Back" className="-ml-2 size-8">
        <ArrowBackIosOutlinedIcon className="size-4" />
      </IconButton>
      <Box className="my-6">
        <Typography className="mb-0.5 font-medium" variant="h3">
          Customise by day
        </Typography>
        <Typography className="mb-8 text-text-secondary">
          Set a minimum night stay based on the day of check-in.
        </Typography>
      </Box>
      <Stack className="gap-4">
        {daysMapping.map(({ label, name }) => (
          <Stack
            key={name}
            className="flex-row items-center justify-between gap-6"
          >
            <Typography className="font-medium">{label}</Typography>
            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoComplete="off"
                  className="shrink-0"
                  id={`outlined-${name}`}
                  placeholder="1"
                  slotProps={{
                    htmlInput: {
                      "aria-labelledby": `input-slider-${name}`,
                      max: 365,
                      min: 0,
                    },
                    input: {
                      classes: {
                        input: "w-14 p-3 text-center",
                      },
                      className:
                        "font-bold bg-common-white rounded-2xl text-2xl group",
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
          </Stack>
        ))}
      </Stack>
      <Stack className="mt-16 gap-3">
        <Button className="w-full" size="large" variant="contained">
          Save
        </Button>
      </Stack>
    </>
  );
}
