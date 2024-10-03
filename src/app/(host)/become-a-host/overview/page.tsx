import type { Metadata } from "next";

import Image from "next/image";

import { Box, Container, Stack, Typography } from "@mui/material";

import aboutYourPlace from "/public/images/aboutYourPlace.webp";
import standOut from "/public/images/standOut.webp";

export const metadata: Metadata = {
  title: "Create your listing - Guestay",
};

export default function Overview() {
  return (
    <Container maxWidth="2xl">
      <Stack className="gap-12 lg:flex-row">
        <Box className="flex items-center lg:w-1/2">
          <Typography
            className="text-4xl lg:max-w-lg lg:text-6xl"
            component="h1"
            variant="h1"
          >
            It’s easy to get started on Airbnb
          </Typography>
        </Box>
        <Box className="lg:w-1/2">
          <Stack className="flex-row gap-4 border-b border-divider pb-8">
            <Typography component="p" variant="h2">
              1
            </Typography>
            <Box>
              <Typography className="mb-2" component="h2" variant="h2">
                Tell us about your place
              </Typography>
              <Typography
                className="text-text-secondary"
                component="h3"
                variant="h3"
              >
                Share some basic info, such as where it is and how many guests
                can stay.
              </Typography>
            </Box>
            <Box className="ml-auto shrink-0">
              <Image
                alt="Tell us about your place"
                className="size-20 rounded md:size-32"
                src={aboutYourPlace}
              />
            </Box>
          </Stack>
          <Stack className="flex-row gap-4 border-b border-divider py-8">
            <Typography component="p" variant="h2">
              2
            </Typography>
            <Box>
              <Typography className="mb-2" component="h2" variant="h2">
                Make it stand out
              </Typography>
              <Typography
                className="text-text-secondary"
                component="h3"
                variant="h3"
              >
                Add 5 or more photos plus a title and description – we’ll help
                you out.
              </Typography>
            </Box>
            <Box className="ml-auto shrink-0">
              <Image
                alt="Make it stand out"
                className="size-20 rounded md:size-32"
                src={standOut}
              />
            </Box>
          </Stack>
          <Stack className="flex-row gap-4 py-8">
            <Typography component="p" variant="h2">
              3
            </Typography>
            <Box>
              <Typography className="mb-2" component="h2" variant="h2">
                Finish up and publish
              </Typography>
              <Typography
                className="text-text-secondary"
                component="h3"
                variant="h3"
              >
                Choose a starting price, verify a few details, then publish your
                listing.
              </Typography>
            </Box>
            <Box className="ml-auto shrink-0">
              <Image
                alt="Finish up and publish"
                className="size-20 rounded lg:size-32"
                src={aboutYourPlace}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
