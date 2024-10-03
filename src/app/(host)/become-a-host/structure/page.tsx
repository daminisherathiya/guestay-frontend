"use client";
import React, { useState } from "react";

import Image from "next/image";

import house from "/public/images/house.svg";
import barn from "/public/images/barn.svg";
import boat from "/public/images/boat.svg";
import cabin from "/public/images/cabin.svg";
import dome from "/public/images/dome.svg";
import flat from "/public/images/flat.svg";
import hotel from "/public/images/hotel.svg";
import breakfast from "/public/images/breakfast.svg";
import tent from "/public/images/tent.svg";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2"; // Grid version 2

export default function Structure() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
  };

  const places = [
    { icon: house, name: "House" },
    { icon: flat, name: "Flat/apartment" },
    { icon: barn, name: "Barn" },
    { icon: breakfast, name: "Bed & breakfast" },
    { icon: boat, name: "Boat" },
    { icon: cabin, name: "Cabin" },
    { icon: dome, name: "Dome" },
    { icon: hotel, name: "Hotel" },
    { icon: tent, name: "Tent" },
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
              <Grid2 key={index} size={{ "2xs": 12, xs: 6, sm: 4 }}>
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
                    src={place.icon}
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
