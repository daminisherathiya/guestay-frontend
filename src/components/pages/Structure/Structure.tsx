"use client";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Typography } from "@/components/atoms/Typography";

import { places } from "./Structure.consts";
import { useStructure } from "./Structure.hooks";

export function Structure() {
  const { handleButtonClick, selectedOption } = useStructure();

  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-3xl">
        <Typography className="mb-8" component="h1" variant="h1">
          Which of these best describes your place?
        </Typography>
        <Grid2 container spacing={2}>
          {places.map((place, index) => (
            <Grid2 key={index} size={{ "2xs": 12, sm: 4, xs: 6 }}>
              <Button
                disableRipple
                className={`w-full flex-col items-start p-4 hover:border-common-transparent hover:bg-common-white hover:shadow-black ${
                  selectedOption === place.name
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
