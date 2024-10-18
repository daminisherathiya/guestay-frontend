"use client";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Typography } from "@/components/atoms/Typography";

import { places } from "./Amenities.consts";
import { useAmenities } from "./Amenities.hooks";

export function Amenities() {
  const { handleButtonClick, selectedOptions } = useAmenities();

  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-3xl">
        <Typography className="mb-2" component="h1" variant="h1">
          Tell guests what your place has to offer
        </Typography>
        <Typography
          className="mb-8 text-text-secondary"
          component="h3"
          variant="h3"
        >
          You can add more amenities after you publish your listing.
        </Typography>
        <Typography className="mb-5 font-medium" component="h3" variant="h3">
          What about these guest favourites?
        </Typography>
        <Grid2 container spacing={2}>
          {places.map((place, index) => (
            <Grid2 key={index} size={{ "2xs": 12, md: 4, sm: 6 }}>
              <Button
                disableRipple
                className={`w-full flex-col items-start p-4 hover:border-common-transparent hover:bg-common-white hover:shadow-black ${
                  selectedOptions.includes(place.name)
                    ? "border-common-transparent bg-background-highlight shadow-black"
                    : ""
                }`}
                variant="outlined"
                onClick={() => handleButtonClick(place.name)}
              >
                <Image
                  alt={place.name}
                  height={45}
                  src={place.iconUrl}
                  width={45}
                />
                <Typography className="font-medium">{place.name}</Typography>
              </Button>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Container>
  );
}
