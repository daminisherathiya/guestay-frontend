import Link from "next/link";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import RadioGroupContext from "@mui/material/RadioGroup/RadioGroupContext";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { FormControl } from "@/components/atoms/FormControl";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

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
        <Box className="relative">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">Advance notice</Typography>
                <Typography className="mt-1 font-medium" variant="body2">
                  Same day
                </Typography>
              </Box>
              <KeyboardArrowDownIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
          <Box className="absolute top-0 z-10 w-full rounded-2xl border border-divider bg-common-white shadow-button">
            <Stack className="flex-row items-center justify-between p-6">
              <Box>
                <Typography variant="body2">Advance notice</Typography>
                <Typography
                  className="mt-1 text-text-secondary "
                  variant="body2"
                >
                  How much notice do you need between a guest’s booking and
                  their arrival?
                </Typography>
              </Box>
              <KeyboardArrowDownIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
            <Divider />
            <Box>
              <FormControl className="w-full">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    className="mx-0 flex-row-reverse justify-between px-6 py-2"
                    control={<Radio />}
                    label="Female"
                    value="female"
                  />
                  <FormControlLabel
                    className="mx-0 flex-row-reverse justify-between px-6 py-2"
                    control={<Radio />}
                    label="Male"
                    value="male"
                  />
                  <FormControlLabel
                    className="mx-0 flex-row-reverse justify-between px-6 py-2"
                    control={<Radio />}
                    label="Other"
                    value="other"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Divider />
            <Box className="px-6 py-4">
              <Button className="w-full" size="large" variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
