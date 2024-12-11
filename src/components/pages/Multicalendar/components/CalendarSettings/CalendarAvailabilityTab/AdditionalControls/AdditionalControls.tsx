import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import SelectableWeekDayButtons from "./SelectableWeekDayButtons/SelectableWeekDayButtons";
export function AdditionalControls() {
  return (
    <>
      <IconButton aria-label="Back" className="-ml-2 size-8">
        <ArrowBackIosOutlinedIcon className="size-4" />
      </IconButton>
      <Stack className="gap-8">
        <Stack className="mt-6 gap-6">
          <Box>
            <Typography className="mb-2 font-medium" variant="h3">
              Restricted check-in
            </Typography>
            <Typography className="text-sm text-text-secondary" variant="body2">
              Guests won’t be able to book your place if their stay starts on
              these days.
            </Typography>
          </Box>
          <SelectableWeekDayButtons />
        </Stack>
        <Stack className="gap-6">
          <Box>
            <Typography className="mb-2 font-medium" variant="h3">
              Restricted checkout
            </Typography>
            <Typography className="text-sm text-text-secondary" variant="body2">
              Guests won’t be able to book your place if their stay ends on
              these days.
            </Typography>
          </Box>
          <SelectableWeekDayButtons />
        </Stack>
        <Stack className="mt-8 gap-3">
          <Button className="w-full" size="large" variant="contained">
            Save
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
