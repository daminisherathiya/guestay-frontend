"use client";

import Script from "next/script";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Typography } from "@/components/atoms/Typography";
import { LocationInputWithAutocompleteService } from "@/components/organisms/LocationInputWithAutocompleteService";

export default function Location() {
  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-3xl">
        <Typography className="mb-2" component="h1" variant="h1">
          Where&apos;s your place located?
        </Typography>
        <Typography
          className="mb-10 text-text-secondary"
          component="h3"
          variant="h3"
        >
          Your address is only shared with guests after they&apos;ve made a
          reservation.
        </Typography>

        <LocationInputWithAutocompleteService></LocationInputWithAutocompleteService>

        {/* <Box className="relative">
            <Image
              alt="Static Map"
              className="rounded-2xl"
              height={500}
              src="/images/staticmap.png"
              width={630}
            />
            <Stack className="absolute top-11 w-full items-center">
              <Autocomplete
                disablePortal
                className="w-4/5 bg-common-white"
                options={options}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Box> */}
      </Box>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />
    </Container>
  );
}
