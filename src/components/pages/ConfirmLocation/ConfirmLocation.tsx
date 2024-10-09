"use client";

import { useState } from "react";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { TextField } from "@/components/atoms/TextField/TextField";
import { Typography } from "@/components/atoms/Typography";
import CountrySelect from "@/components/molecules/CountrySelect/CountrySelect";

const confirmAddressTextFields = [
  { label: "Flat, house, etc. (if applicable)" },
  { label: "Street address" },
  { label: "Nearby landmark (if applicable)" },
  { label: "District/locality (if applicable)" },
  { label: "City / town" },
  { label: "State/union territory" },
  { label: "PIN code" },
];

export default function ConfirmLocation() {
  const [focusedInputIndex, setFocusedInputIndex] = useState<null | number>(
    null,
  );

  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-3xl">
        <Typography className="mb-2" component="h1" variant="h1">
          Confirm your address
        </Typography>
        <Typography
          className="mb-10 text-text-secondary"
          component="h3"
          variant="h3"
        >
          Your address is only shared with guests after they’ve made a
          reservation.
        </Typography>
        <CountrySelect />
        <Box className="mt-4">
          {confirmAddressTextFields.map((confirmAddressTextField, index) => (
            <TextField
              key={index}
              className="w-full"
              color="secondary"
              id="filled-basic"
              label={confirmAddressTextField.label}
              slotProps={{
                input: {
                  classes: { focused: "before:border-y-common-transparent" },
                  className: `g-common-white before:h-full ${index === 0 ? "before:rounded-t-lg" : ""} ${index === confirmAddressTextFields.length - 1 ? "before:rounded-b-lg before:!border-b" : ""} ${focusedInputIndex === index - 1 ? "before:border-t-0" : ""} bg-common-white before:border-x before:border-b-0 before:border-t before:border-common-black/45 before:transition-none after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none`,
                },
              }}
              variant="filled"
              onBlur={() => setFocusedInputIndex(null)}
              onFocus={() => setFocusedInputIndex(index)}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
