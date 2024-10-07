"use client";

import React, { useState } from "react";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Typography } from "@/components/atoms/Typography";

export default function Amenities() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((option) => option !== value),
      );
    } else {
      setSelectedOptions((prevSelected) => [...prevSelected, value]);
    }
  };

  const places = [
    { iconUrl: "/images/wifi.svg", name: "Wifi" },
    { iconUrl: "/images/tv.svg", name: "TV" },
    { iconUrl: "/images/kitchen.svg", name: "Kitchen" },
    { iconUrl: "/images/washingMachine.svg", name: "Washing machine" },
    { iconUrl: "/images/car.svg", name: "Free parking on premises" },
    { iconUrl: "/images/parkingMeter.svg", name: "Paid parking on premises" },
    { iconUrl: "/images/snowflake.svg", name: "Air conditioning" },
    { iconUrl: "/images/desk.svg", name: "Dedicated workspace" },
    { iconUrl: "/images/pool.svg", name: "Pool" },
    { iconUrl: "/images/tub.svg", name: "Hot tub" },
    { iconUrl: "/images/patio.svg", name: "Patio" },
    { iconUrl: "/images/bbq.svg", name: "BBQ grill" },
    { iconUrl: "/images/umbrellaTable.svg", name: "Outdoor dining area" },
    { iconUrl: "/images/firepit.svg", name: "Firepit" },
    { iconUrl: "/images/poolTable.svg", name: "Pool table" },
    { iconUrl: "/images/fireplace.svg", name: "Indoor fireplace" },
    { iconUrl: "/images/piano.svg", name: "Piano" },
    { iconUrl: "/images/fitnessCenter.svg", name: "Exercise equipment" },
    { iconUrl: "/images/lake.svg", name: "Lake access" },
    { iconUrl: "/images/beach.svg", name: "Beach access" },
    { iconUrl: "/images/skiing.svg", name: "Ski-in/out" },
    { iconUrl: "/images/shower.svg", name: "Outdoor shower" },
    { iconUrl: "/images/tire.svg", name: "Smoke alarm" },
    { iconUrl: "/images/firstAid.svg", name: "First aid kit" },
    { iconUrl: "/images/fireExtinguisher.svg", name: "Fire extinguisher" },
    { iconUrl: "/images/tireSqure.svg", name: "Carbon monoxide alarm" },
  ];

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
                className={`w-full flex-col items-start p-4 hover:border-common-transparent hover:bg-common-white hover:shadow-black ${
                  selectedOptions.includes(place.name)
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
    </Container>
  );
}
