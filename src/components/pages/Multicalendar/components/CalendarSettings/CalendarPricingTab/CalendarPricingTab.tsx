import Link from "next/link";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { CustomSwitch } from "@/components/molecules/CustomSwitch";

export function CalendarPricingTab() {
  return (
    <Stack className="gap-8">
      <Stack className="gap-4">
        <Stack className="grow flex-row items-center justify-between">
          <Typography variant="h2">Base price</Typography>
          <Typography className="text-xs font-medium" variant="body2">
            USD
          </Typography>
        </Stack>
        <Link href="#">
          <Box className="space-y-2 rounded-2xl border border-divider p-6">
            <Typography variant="body2">Per night</Typography>
            <Typography className="text-3xl font-bold">$25</Typography>
          </Box>
        </Link>
        <Link href="#">
          <Stack className="flex-row items-center justify-between rounded-2xl border border-divider p-6">
            <Typography variant="body2">Custom weekend price</Typography>
            <Typography className="font-medium underline" variant="body2">
              Add
            </Typography>
          </Stack>
        </Link>
        <Box>
          <Stack className="flex-row items-center justify-between rounded-2xl border border-divider p-6">
            <Typography variant="body2">Smart Pricing</Typography>
            <CustomSwitch />
          </Stack>
        </Box>
      </Stack>
      <Stack className="gap-4">
        <Stack className="grow">
          <Typography variant="h2">Discounts</Typography>
          <Typography className="mb-2 mt-1 text-text-secondary" variant="body2">
            Adjust your pricing to attract more guests.
          </Typography>
        </Stack>
        <Link href="#">
          <Box className="rounded-2xl border border-divider p-6">
            <Typography variant="body2">Weekly</Typography>
            <Typography
              className="mt-1 text-xs text-text-secondary"
              variant="body2"
            >
              For 7 nights or more
            </Typography>
            <Stack className="mt-2.5 flex-row items-end justify-between gap-3">
              <Typography className="text-3xl font-bold">25%</Typography>
              <Typography
                className="text-xs text-text-secondary"
                variant="body2"
              >
                Weekly average is $515
              </Typography>
            </Stack>
          </Box>
        </Link>
        <Link href="#">
          <Box className="rounded-2xl border border-divider p-6">
            <Typography variant="body2">Monthly</Typography>
            <Typography
              className="mt-1 text-xs text-text-secondary"
              variant="body2"
            >
              For 28 nights or more
            </Typography>
            <Stack className="mt-2.5 flex-row items-end justify-between gap-3">
              <Typography className="text-3xl font-bold">15%</Typography>
              <Typography
                className="text-xs text-text-secondary"
                variant="body2"
              >
                Monthly average is $2,040
              </Typography>
            </Stack>
          </Box>
        </Link>
        <Link href="#">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">More discounts</Typography>
                <Typography
                  className="mt-1 text-xs text-text-secondary"
                  variant="body2"
                >
                  Early-bird, last-minute
                </Typography>
              </Box>
              <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
        </Link>
      </Stack>
      <Stack className="gap-4">
        <Stack className="grow">
          <Typography variant="h2">Promotions</Typography>
          <Typography className="mb-2 mt-1 text-text-secondary" variant="body2">
            Set short-term discounts to get new bookings.
          </Typography>
        </Stack>
        <Link href="#">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">New listing promotion</Typography>
                <Typography
                  className="mt-1 text-xs text-text-secondary"
                  variant="body2"
                >
                  Get your first guests in the door
                </Typography>
              </Box>
              <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
        </Link>
      </Stack>
      <Stack className="gap-4">
        <Stack className="grow">
          <Typography variant="h2">Additional charges</Typography>
        </Stack>
        <Link href="#">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">Fees</Typography>
                <Typography
                  className="mt-1 text-xs text-text-secondary"
                  variant="body2"
                >
                  Cleaning, pets, extra guests
                </Typography>
              </Box>
              <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
        </Link>
      </Stack>
    </Stack>
  );
}
