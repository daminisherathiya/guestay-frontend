"use client";

import { useState } from "react";

import Image from "next/image";

import StarIcon from "@mui/icons-material/Star";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import FullReceiptPreviewDialog from "@/components/molecules/FullReceiptPreviewDialog/FullReceiptPreviewDialog";

export default function Receipt() {
  const [isFullReceiptPreviewDialogOpen, setFullReceiptPreviewDialogOpen] =
    useState(false);

  const handleOpenFullReceiptPreviewDialog = () => {
    setFullReceiptPreviewDialogOpen(true);
  };

  const handleCloseFullReceiptPreviewDialog = () => {
    setFullReceiptPreviewDialogOpen(false);
  };

  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-5xl">
        <Typography
          className="mb-2 text-3xl md:mb-6 md:text-5xl"
          component="h1"
          variant="h1"
        >
          Review your listing
        </Typography>
        <Typography
          className="mb-12 text-text-secondary"
          component="h3"
          variant="h3"
        >
          Here&apos;s what we&apos;ll show to guests. Make sure everything looks
          good.
        </Typography>
        <Grid2 container className="items-center" spacing={9}>
          <Grid2 size={5}>
            <Button
              disableRipple
              className="w-full flex-col items-start rounded-2xl border border-common-black/5 p-4 text-start no-underline shadow-button"
              onClick={handleOpenFullReceiptPreviewDialog}
            >
              <Box className="relative w-full">
                <Image
                  alt="Cover picture"
                  className="max-h-80 w-full rounded-lg object-cover"
                  height={320}
                  src="/images/aa.jpg"
                  width={320}
                />
                <Box className="absolute left-4 top-4 rounded border border-common-black/5 bg-common-white px-2 py-1 text-sm leading-4 shadow-button">
                  Show preview
                </Box>
              </Box>
              <Stack className="mt-4 w-full flex-row justify-between">
                <Box>
                  <Typography className="mb-1 font-medium" variant="body2">
                    The Orchard House
                  </Typography>
                  <Typography variant="body2">
                    <Typography
                      className="text-text-secondary line-through"
                      component="span"
                      variant="body2"
                    >
                      ₹5,325
                    </Typography>{" "}
                    <Typography
                      className="font-bold"
                      component="span"
                      variant="body2"
                    >
                      ₹5,325
                    </Typography>{" "}
                    night
                  </Typography>
                </Box>
                <Stack>
                  <Typography variant="body2">
                    New <StarIcon className="size-4" />
                  </Typography>
                </Stack>
              </Stack>
            </Button>
            <FullReceiptPreviewDialog
              handleCloseFullReceiptPreviewDialog={
                handleCloseFullReceiptPreviewDialog
              }
              isFullReceiptPreviewDialogOpen={isFullReceiptPreviewDialogOpen}
            />
          </Grid2>
          <Grid2 size={7}>
            <Box className="space-y-8">
              <Typography component="h2" variant="h2">
                What&apos;s next?
              </Typography>
              <Stack className="flex-row gap-4">
                <Box className="shrink-0">
                  <Image
                    alt="Confirm a few details and publish"
                    className="size-8"
                    height={32}
                    src="/images/clipboardCheck.svg"
                    width={32}
                  />
                </Box>
                <Box>
                  <Typography
                    className="mb-1 font-medium"
                    component="h3"
                    variant="h3"
                  >
                    Confirm a few details and publish
                  </Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    We’ll let you know if you need to verify your identity or
                    register with the local government.
                  </Typography>
                </Box>
              </Stack>
              <Stack className="flex-row gap-4">
                <Box className="shrink-0">
                  <Image
                    alt="Confirm a few details and publish"
                    className="size-8"
                    height={32}
                    src="/images/calendar.svg"
                    width={32}
                  />
                </Box>
                <Box>
                  <Typography
                    className="mb-1 font-medium"
                    component="h3"
                    variant="h3"
                  >
                    Set up your calendar
                  </Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Choose which dates your listing is available. It will be
                    visible 24 hours after you publish.
                  </Typography>
                </Box>
              </Stack>
              <Stack className="flex-row gap-4">
                <Box className="shrink-0">
                  <Image
                    alt="Confirm a few details and publish"
                    className="size-8"
                    height={32}
                    src="/images/pencilEdit.svg"
                    width={32}
                  />
                </Box>
                <Box>
                  <Typography
                    className="mb-1 font-medium"
                    component="h3"
                    variant="h3"
                  >
                    Adjust your settings
                  </Typography>
                  <Typography className="text-text-secondary" variant="body2">
                    Set house rules, select a cancellation policy, choose how
                    guests book and more.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
