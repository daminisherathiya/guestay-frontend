import Link from "next/link";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

export default function NotFound() {
  return (
    <Stack className="h-[calc(100vh-6.375rem)] flex-row items-center justify-center">
      <Typography
        className="mr-5 border-r py-2 pr-5 leading-10"
        component="h1"
        variant="h1"
      >
        404
      </Typography>
      <Box className="text-center">
        <Typography>This page could not be found.</Typography>
        <Link className="font-medium hover:underline" href="/">
          Return Home
        </Link>
      </Box>
    </Stack>
  );
}
