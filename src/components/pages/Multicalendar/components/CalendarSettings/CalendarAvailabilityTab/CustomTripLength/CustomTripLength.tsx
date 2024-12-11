import Link from "next/link";

import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

export function CustomTripLength() {
  return (
    <Stack className="gap-8">
      <IconButton aria-label="Back" className="-ml-2 size-8">
        <ArrowBackIosOutlinedIcon className="size-4" />
      </IconButton>
      <Box>
        <Typography className="mb-2 font-medium" variant="h3">
          Custom trip lengths
        </Typography>
        <Typography className="text-text-secondary" variant="body2">
          Set a minimum stay for specific dates.
        </Typography>
      </Box>
      <Stack className="gap-4">
        <Box className="space-y-2 rounded-2xl border border-divider p-6">
          <Box>
            <Typography variant="body2">26–28 Dec 2024</Typography>
            <Typography className="text-text-secondary" variant="body2">
              199-night minimum stay
            </Typography>
          </Box>
          <Button className="min-w-0 p-0 leading-5 hover:bg-common-transparent">
            Remove
          </Button>
        </Box>
        <Box className="space-y-2 rounded-2xl border border-divider p-6">
          <Box>
            <Typography variant="body2">29–31 Dec 2024</Typography>
            <Typography className="text-text-secondary" variant="body2">
              10-night minimum stay
            </Typography>
          </Box>
          <Button className="min-w-0 p-0 leading-5 hover:bg-common-transparent">
            Remove
          </Button>
        </Box>
      </Stack>
      <Stack className="mt-2 gap-3">
        <Button
          className="w-full"
          component={Link}
          href="./custom-length/add"
          size="large"
          variant="contained"
        >
          Add a custom trip length
        </Button>
      </Stack>
    </Stack>
  );
}
