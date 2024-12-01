import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import SelectableWeekDayButtons from "./SelectableWeekDayButtons/SelectableWeekDayButtons";

export function AdditionalControls() {
  return (
    <Stack className="gap-8">
      <Stack className="gap-6">
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
    </Stack>
  );
}
