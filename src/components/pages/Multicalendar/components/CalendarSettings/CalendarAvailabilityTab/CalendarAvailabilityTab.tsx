import Link from "next/link";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { DropdownWithOptions } from "./DropdownWithOptions";

export function CalendarAvailabilityTab() {
  return (
    <Stack className="gap-8">
      <Stack className="gap-4">
        <Typography variant="h2">Trip length</Typography>
        <Box>
          <Link href="#">
            <Box className="space-y-2 rounded-t-2xl border border-divider px-6 py-4">
              <Typography variant="body2">Minimum nights</Typography>
              <Typography className="text-3xl font-bold">1</Typography>
            </Box>
          </Link>
          <Link href="#">
            <Box className="space-y-2 rounded-b-2xl border border-t-0 border-divider px-6 py-4">
              <Typography variant="body2">Maximum nights</Typography>
              <Typography className="text-3xl font-bold">365</Typography>
            </Box>
          </Link>
        </Box>
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
        <DropdownWithOptions title="Advance notice" descriptions="How much notice do you need between a guest’s booking and arrival?" />
        <DropdownWithOptions title="Preparation time" descriptions="How many nights before and after each reservation do you need to block off?" />
        <DropdownWithOptions title="Availability window" descriptions="How far in advance can guests book?" />
        <Link href="./availability-settings/additional-controls">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">More availability settings</Typography>
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
