"use client";

import Image from "next/image";

import { Skeleton } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Typography } from "@/components/atoms/Typography";

import { useAmenities } from "./Amenities.hooks";

export function Amenities() {
  const {
    amenitiesApiData,
    AmenitiesApiSnackbarAlert,
    Footer,
    handleButtonClick,
    isLoading,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    selectedOptions,
  } = useAmenities();

  return (
    <>
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
          {isLoading ? (
            <Grid2 container spacing={2}>
              {Array.from({ length: 9 }).map((_, index) => (
                <Grid2 key={index} size={{ "2xs": 12, md: 4, sm: 6 }}>
                  <Skeleton
                    className="w-full rounded-lg"
                    height={103}
                    variant="rectangular"
                  />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Grid2 container spacing={2}>
              {(amenitiesApiData?.data || []).map((amenity) => (
                <Grid2 key={amenity.id} size={{ "2xs": 12, md: 4, sm: 6 }}>
                  <Button
                    disableRipple
                    className={`size-full flex-col items-start p-4 hover:border-common-transparent hover:bg-common-white hover:shadow-black ${
                      selectedOptions.includes(amenity.id)
                        ? "border-common-transparent bg-background-highlight shadow-black"
                        : ""
                    }`}
                    variant="outlined"
                    onClick={() => handleButtonClick(amenity.id)}
                  >
                    {amenity.icon ? (
                      <Image
                        alt={amenity.title}
                        className="size-8 object-cover"
                        height={32}
                        src={`https://guestay.webarysites.com/data/amenities_icons/${amenity.icon}`}
                        width={32}
                      />
                    ) : (
                      <Box className="size-8 rounded-sm bg-action-disabledBackground/30"></Box>
                    )}
                    <Typography className="mt-2 text-left font-medium">
                      {amenity.title}
                    </Typography>
                  </Button>
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>
      </Container>
      {Footer}
      {AmenitiesApiSnackbarAlert}
      {PropertyApiSnackbarAlert}
      {SavePropertyApiSnackbarAlert}
    </>
  );
}
