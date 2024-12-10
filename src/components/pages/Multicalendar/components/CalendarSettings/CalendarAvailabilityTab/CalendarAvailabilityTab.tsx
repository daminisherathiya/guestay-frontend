import Link from "next/link";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { DropdownWithOptions } from "./DropdownWithOptions";

const advanceNoticeOptions = [
  { label: "Same day", value: "Same day" },
  { label: "At least 1 day", value: "At least 1 day" },
  { label: "At least 2 day", value: "At least 2 day" },
  { label: "At least 3 day", value: "At least 3 day" },
  { label: "At least 7 day", value: "At least 7 day" },
];

const preparationTimeOptions = [
  { label: "None", value: "None" },
  {
    label: "1 night before and after each reservation",
    value: "1 night before and after each reservation",
  },
  {
    label: "2 nights before and after each reservation",
    value: "2 nights before and after each reservation",
  },
];

const availabilityWindowOptions = [
  { label: "9 months in advance", value: "9 months in advance" },
  { label: "6 months in advance", value: "6 months in advance" },
  { label: "3 months in advance", value: "3 months in advance" },
];

export function CalendarAvailabilityTab() {
  return (
    <Stack className="gap-8">
      <Stack className="gap-4">
        <Typography variant="h2">Trip length</Typography>
        <Link href="./availability-settings/minimum-stay">
          <Box className="space-y-2 rounded-2xl border border-divider px-6 py-4">
            <Typography variant="body2">Minimum nights</Typography>
            <Typography className="text-3xl font-bold">1</Typography>
          </Box>
        </Link>
        <Link href="#">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">Custom trip lengths</Typography>
              </Box>
              <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
        </Link>
      </Stack>
      <Stack className="gap-4">
        <Typography variant="h2">Availability</Typography>
        <DropdownWithOptions
          descriptions="How much notice do you need between a guest’s booking and arrival?"
          options={advanceNoticeOptions}
          title="Advance notice"
        />
        <DropdownWithOptions
          descriptions="How many nights before and after each reservation do you need to block off?"
          options={preparationTimeOptions}
          title="Preparation time"
        />
        <DropdownWithOptions
          descriptions="How far in advance can guests book?"
          options={availabilityWindowOptions}
          title="Availability window"
        />
        <Link href="./availability-settings/additional-controls">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">
                  More availability settings
                </Typography>
                <Typography
                  className="mt-1 text-xs text-text-secondary"
                  variant="body2"
                >
                  Restrict check-in and checkout days
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
