"use client";

import React, { useState } from "react";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

export default function Structure() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
  };

  const places = [
    { iconUrl: "/images/house.svg", name: "House" },
    { iconUrl: "/images/flat.svg", name: "Flat/apartment" },
    { iconUrl: "/images/barn.svg", name: "Barn" },
    { iconUrl: "/images/breakfast.svg", name: "Bed & breakfast" },
    { iconUrl: "/images/boat.svg", name: "Boat" },
    { iconUrl: "/images/cabin.svg", name: "Cabin" },
    { iconUrl: "/images/dome.svg", name: "Dome" },
    { iconUrl: "/images/hotel.svg", name: "Hotel" },
    { iconUrl: "/images/tent.svg", name: "Tent" },
  ];

  return (
    <Container maxWidth="2xl">
      <Stack>
        <Box className="mx-auto max-w-3xl">
          <Typography className="mb-8" component="h1" variant="h1">
            Which of these best describes your place?
          </Typography>
          <Grid2 container spacing={2}>
            {places.map((place, index) => (
              <Grid2 key={index} size={{ "2xs": 12, sm: 4, xs: 6 }}>
                <Button
                  className={`w-full flex-col items-start p-4 hover:border-common-transparent hover:bg-common-white hover:shadow-black ${
                    selectedOption === place.name
                      ? "border-common-transparent bg-[#f7f7f7] shadow-black"
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
      </Stack>
    </Container>
  );
}
