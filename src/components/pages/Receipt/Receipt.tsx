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

export default function Receipt() {
  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-4xl">
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
        <Grid2 container spacing={9}>
          <Grid2 size={5}>
            <Button
              disableRipple
              className="w-full flex-col items-start rounded-2xl border border-common-black/5 p-4 text-start no-underline shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
            >
              <Image
                alt="Cover picture"
                className="w-full rounded-lg object-cover"
                height={320}
                src="/images/aa.jpg"
                width={320}
              />
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
          </Grid2>
          <Grid2 size={7}></Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
