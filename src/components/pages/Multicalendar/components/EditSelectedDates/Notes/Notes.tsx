import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { TextareaAutosize } from "@/components/atoms/TextareaAutosize";
import { Typography } from "@/components/atoms/Typography";

export function Notes() {
  return (
    <Stack className="gap-6">
      <IconButton aria-label="Back" className="-ml-2 size-8">
        <ArrowBackIosOutlinedIcon className="size-4" />
      </IconButton>
      <Box>
        <Typography className="font-medium" variant="h3">
          Your private notes
        </Typography>
      </Box>
      <Stack className="gap-3">
        <Typography>12 Dec</Typography>
        <TextareaAutosize
          className="w-full rounded-lg border p-3 focus:outline-2 focus:outline-common-black"
          id="title"
          maxRows={4}
          minRows={4}
          placeholder="Add a private note"
        />
      </Stack>
      <Stack className="mt-12 gap-3">
        <Button className="w-full" size="large" variant="contained">
          Save
        </Button>
      </Stack>
    </Stack>
  );
}
