"use client";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { CircularProgress } from "@/components/atoms/CircularProgress";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { useRedirectToRightPropertyListingUrl } from "./RedirectToRightPropertyListingUrl.hooks";

export function RedirectToRightPropertyListingUrl() {
  const { showError } = useRedirectToRightPropertyListingUrl();

  return (
    <>
      {showError ? (
        <Box className="space-y-3">
          <Typography variant="h2">No listings found</Typography>
          <Typography variant="body2">
            We couldn&apos;t find any listings that match your criteria.
          </Typography>
          <Button variant="contained">Go to Home</Button>
        </Box>
      ) : (
        <Stack className="h-[calc(100vh-11.375rem)] items-center justify-center">
          <CircularProgress disableShrink className="mx-auto" />
        </Stack>
      )}
    </>
  );
}
