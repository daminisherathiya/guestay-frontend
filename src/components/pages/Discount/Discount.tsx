"use client";

import { Controller } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
import { numericValue, removeLeadingZeros } from "@/utils/common";

import { DiscountsDialog } from "./components/DiscountsDialog";
import { useDiscount } from "./Discount.hooks";

export function Discount() {
  const {
    control,
    discountsDialogIsOpen,
    Footer,
    isLoading,
    isMonthlyDiscountEnabled,
    isWeeklyDiscountEnabled,
    setDiscountsDialogIsOpenFalse,
    setDiscountsDialogIsOpenTrue,
  } = useDiscount();

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-2xl">
          <Typography className="mb-2" component="h1" variant="h1">
            Add discounts
          </Typography>
          <Typography
            className="mb-8 text-text-secondary"
            component="h3"
            variant="h3"
          >
            Help your place stand out to get booked faster and earn your first
            reviews.
          </Typography>
          <Box className="space-y-6">
            {/* <Box className="rounded-xl border border-divider bg-action-hover p-4 md:px-6 md:py-8">
              <Stack className="flex-row items-center justify-between gap-4">
                <Stack className="flex-row items-center gap-4">
                  <TextField
                    disabled
                    autoComplete="off"
                    className="shrink-0"
                    id="outlined-basic"
                    slotProps={{
                      input: {
                        classes: {
                          input: "w-6 py-2 pl-3",
                          notchedOutline: "border-none",
                        },
                        className:
                          "pl-0 font-bold text-lg text-text-primary pr-3",
                        endAdornment: (
                          <Typography className="text-lg font-bold">
                            %
                          </Typography>
                        ),
                      },
                    }}
                    value={20}
                    variant="outlined"
                  />
                  <Box>
                    <Typography>New listing promotion</Typography>
                    <Typography className="text-text-secondary" variant="body2">
                      Offer 20% off your first 3 bookings
                    </Typography>
                  </Box>
                </Stack>
                <Checkbox
                  defaultChecked
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                />
              </Stack>
            </Box> */}
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full rounded-lg"
                  height={112}
                  variant="rectangular"
                />
              ))
            ) : (
              <>
                <Box className="rounded-xl border border-divider bg-action-hover p-4 md:px-6 md:py-8">
                  <Stack className="flex-row items-center justify-between gap-4">
                    <Stack className="flex-row items-center gap-4">
                      <Controller
                        control={control}
                        name="weeklyDiscount"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            autoComplete="off"
                            className="shrink-0"
                            disabled={!isWeeklyDiscountEnabled}
                            id="outlined-basic"
                            slotProps={{
                              input: {
                                classes: {
                                  input: `w-6 py-2 pl-3 text-right ${!isWeeklyDiscountEnabled ? "cursor-not-allowed" : ""}`,
                                  notchedOutline: !isWeeklyDiscountEnabled
                                    ? "border-common-black/25"
                                    : "",
                                },
                                className: `pl-0 font-bold bg-common-white rounded-lg text-lg pr-3 ${!isWeeklyDiscountEnabled ? "opacity-30 bg-action-hover" : ""}`,
                                endAdornment: (
                                  <Typography className="text-lg font-bold">
                                    %
                                  </Typography>
                                ),
                                inputProps: {
                                  inputMode: "numeric",
                                  max: 99,
                                  maxLength: 2,
                                  min: 0,
                                },
                              },
                            }}
                            variant="outlined"
                            onChange={(e) => {
                              const value = numericValue(
                                removeLeadingZeros(e.target.value),
                              );
                              const clampedValue = Math.max(
                                0,
                                Math.min(99, Number(value) || 0),
                              );
                              field.onChange(value ? clampedValue : "");
                            }}
                          />
                        )}
                        rules={{
                          pattern: /^[0-9]{1,2}$/,
                          validate: (value) => value <= 99 || "Max value is 99",
                        }}
                      />
                      <Box>
                        <Typography>Weekly discount</Typography>
                        <Typography
                          className="text-text-secondary"
                          variant="body2"
                        >
                          For stays of 7 nights or more
                        </Typography>
                      </Box>
                    </Stack>
                    <Controller
                      control={control}
                      name="weeklyDiscountChecked"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          // defaultChecked
                          checked={field.value}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      )}
                    />
                  </Stack>
                </Box>
                <Box className="rounded-xl border border-divider bg-action-hover p-4 md:px-6 md:py-8">
                  <Stack className="flex-row items-center justify-between gap-4">
                    <Stack className="flex-row items-center gap-4">
                      <Controller
                        control={control}
                        name="monthlyDiscount"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            autoComplete="off"
                            className="shrink-0"
                            disabled={!isMonthlyDiscountEnabled}
                            id="outlined-basic"
                            slotProps={{
                              input: {
                                classes: {
                                  input: `w-6 py-2 pl-3 text-right ${!isMonthlyDiscountEnabled ? "cursor-not-allowed" : ""}`,
                                  notchedOutline: !isMonthlyDiscountEnabled
                                    ? "border-common-black/25"
                                    : "",
                                },
                                className: `pl-0 font-bold bg-common-white rounded-lg text-lg pr-3 ${!isMonthlyDiscountEnabled ? "opacity-30 bg-action-hover" : ""}`,
                                endAdornment: (
                                  <Typography className="text-lg font-bold">
                                    %
                                  </Typography>
                                ),
                                inputProps: {
                                  inputMode: "numeric",
                                  max: 99,
                                  maxLength: 2,
                                  min: 0,
                                },
                              },
                            }}
                            variant="outlined"
                            onChange={(e) => {
                              const value = numericValue(
                                removeLeadingZeros(e.target.value),
                              );
                              const clampedValue = Math.max(
                                0,
                                Math.min(99, Number(value) || 0),
                              );
                              field.onChange(value ? clampedValue : "");
                            }}
                          />
                        )}
                        rules={{
                          pattern: /^[0-9]{1,2}$/,
                          validate: (value) => value <= 99 || "Max value is 99",
                        }}
                      />
                      <Box>
                        <Typography>Monthly discount</Typography>
                        <Typography
                          className="text-text-secondary"
                          variant="body2"
                        >
                          For stays of 28 nights or more
                        </Typography>
                      </Box>
                    </Stack>
                    <Controller
                      control={control}
                      name="monthlyDiscountChecked"
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          // defaultChecked
                          checked={field.value}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      )}
                    />
                  </Stack>
                </Box>
              </>
            )}
          </Box>
          <Typography className="mt-6 text-center text-xs text-text-secondary">
            Only one discount will be applied per stay.{" "}
            <Button
              disableRipple
              className="p-0 text-xs font-normal text-text-secondary"
              variant="text"
              onClick={setDiscountsDialogIsOpenTrue}
            >
              Learn more
            </Button>
            <DiscountsDialog
              discountsDialogIsOpen={discountsDialogIsOpen}
              handleCloseDiscountsDialog={setDiscountsDialogIsOpenFalse}
            />
          </Typography>
        </Box>
      </Container>
      {Footer}
    </>
  );
}
