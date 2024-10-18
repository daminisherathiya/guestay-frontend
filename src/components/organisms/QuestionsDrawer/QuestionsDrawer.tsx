import CloseIcon from "@mui/icons-material/Close";

import { Box } from "@/components/atoms/Box";
import { IconButton } from "@/components/atoms/IconButton/IconButton";
import { Typography } from "@/components/atoms/Typography";

import { QuestionsDrawerProps } from "./QuestionsDrawer.types";

export function QuestionsDrawer({ onClose }: QuestionsDrawerProps) {
  return (
    <Box className="px-6">
      <Box className="relative py-5">
        <IconButton
          aria-label="close"
          className="absolute top-1/2 -translate-y-1/2"
          onClick={onClose}
        >
          <CloseIcon className="size-4" />
        </IconButton>
        <Typography className="text-center font-medium">Questions?</Typography>
      </Box>
    </Box>
  );
}
