"use client";
import { useState } from "react";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

interface CounterItem {
  field: keyof CounterState;
  max: number;
  name: string;
}

interface CounterState {
  bathrooms: number;
  bedrooms: number;
  beds: number;
  guests: number;
}

const floorPlanItems: CounterItem[] = [
  { field: "guests", max: 16, name: "Guests" },
  { field: "bedrooms", max: 50, name: "Bedrooms" },
  { field: "beds", max: 50, name: "Beds" },
  { field: "bathrooms", max: 50, name: "Bathrooms" },
];

export default function FloorPlan() {
  const [counters, setCounters] = useState<CounterState>({
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    guests: 1,
  });

  const handleIncrease = (field: keyof CounterState, maxLimit: number) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] < maxLimit
              ? prevCounters[field] + 1
              : prevCounters[field],
        };
      }
    });
  };

  const handleDecrease = (field: keyof CounterState) => {
    setCounters((prevCounters) => {
      if (field === "bathrooms") {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 0.5
              : prevCounters[field],
        };
      } else {
        return {
          ...prevCounters,
          [field]:
            prevCounters[field] > 0
              ? prevCounters[field] - 1
              : prevCounters[field],
        };
      }
    });
  };

  const displayValue = (
    value: number,
    max: number,
    field: keyof CounterState,
  ) => {
    return field === "guests" && value === max ? `${value}+` : value;
  };

  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-2xl">
        <Typography className="mb-2" component="h1" variant="h1">
          Share some basics about your place
        </Typography>
        <Typography
          className="mb-8 text-text-secondary"
          component="h3"
          variant="h3"
        >
          You&apos;ll add more details later, such as bed types.
        </Typography>
        <Box>
          {floorPlanItems.map((floorPlanItem, index) => (
            <Stack
              key={index}
              className="flex-row items-center justify-between border-b-divider py-6 [&:not(:last-child)]:border-b"
            >
              <Typography component="p" variant="h3">
                {floorPlanItem.name}
              </Typography>
              <Stack className="w-[6.5rem] flex-row items-center justify-between">
                <IconButton
                  className={`flex size-8 items-center justify-center border border-solid border-divider ${
                    counters[floorPlanItem.field] === 0
                      ? "pointer-events-none opacity-30"
                      : ""
                  }`}
                  disabled={counters[floorPlanItem.field] === 0}
                  onClick={() => handleDecrease(floorPlanItem.field)}
                >
                  <Image
                    alt="Minue"
                    height={12}
                    src="/images/minus.svg"
                    width={12}
                  />
                </IconButton>
                <Typography>
                  {displayValue(
                    counters[floorPlanItem.field],
                    floorPlanItem.max,
                    floorPlanItem.field,
                  )}
                </Typography>
                <IconButton
                  className={`flex size-8 items-center justify-center border border-solid border-divider ${
                    counters[floorPlanItem.field] === floorPlanItem.max
                      ? "pointer-events-none opacity-30"
                      : ""
                  }`}
                  disabled={counters[floorPlanItem.field] === floorPlanItem.max}
                  onClick={() =>
                    handleIncrease(floorPlanItem.field, floorPlanItem.max)
                  }
                >
                  <Image
                    alt="Minue"
                    height={12}
                    src="/images/plus.svg"
                    width={12}
                  />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
