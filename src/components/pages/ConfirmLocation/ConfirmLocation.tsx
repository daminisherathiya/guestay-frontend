"use client";

import { useState } from "react";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField/TextField";
import { Typography } from "@/components/atoms/Typography";
import CountrySelect from "@/components/organisms/CountrySelect/CountrySelect";

export default function ConfirmLocation() {
  const [focusedInputIndex, setFocusedInputIndex] = useState<null | number>(
    null,
  );

  return (
    <Container maxWidth="2xl">
      <Stack>
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
            <TextField
              className="w-full"
              id="filled-basic"
              label="Filled"
              slotProps={{
                input: {
                  classes: { focused: "before:border-y-common-transparent" },
                  className: `before:border-common-black/45 before:border-t before:border-r before:border-b-0 before:border-l before:rounded-t-lg before:transition-none before:h-full after:h-full after:border-2 after:border-common-black after:transition-none after:rounded-lg`,
                },
              }}
              variant="filled"
              onBlur={() => setFocusedInputIndex(null)}
              onFocus={() => setFocusedInputIndex(0)}
            />
            <TextField
              className="w-full"
              id="filled-basic"
              label="Filled"
              slotProps={{
                input: {
                  classes: { focused: "before:border-y-common-transparent" },
                  className: `before:border-common-black/45 before:border-t before:border-r before:border-b-0 before:border-l ${focusedInputIndex === 0 ? "before:border-t-0" : ""} before:transition-none before:h-full after:h-full after:border-2 after:border-common-black after:transition-none after:rounded-lg`,
                },
              }}
              variant="filled"
              onBlur={() => setFocusedInputIndex(null)}
              onFocus={() => setFocusedInputIndex(1)}
            />
            <TextField
              className="w-full"
              id="filled-basic"
              label="Filled"
              slotProps={{
                input: {
                  classes: { focused: "before:border-y-common-transparent" },
                  className: `before:border-common-black/45 before:border-t before:border-r before:border-b before:border-l before:rounded-b-lg ${focusedInputIndex === 1 ? "before:border-t-0" : ""} before:transition-none before:h-full after:h-full after:border-2 after:border-common-black after:transition-none after:rounded-lg`,
                },
              }}
              variant="filled"
              onBlur={() => setFocusedInputIndex(null)}
              onFocus={() => setFocusedInputIndex(2)}
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
