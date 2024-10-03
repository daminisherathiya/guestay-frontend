"use client";

import Image from "next/image";

import {
  Autocomplete,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import staticMap from "/public/images/staticmap.png";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
];

export default function Location() {
  return (
    <Container maxWidth="2xl">
      <Stack>
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
          <Box className="relative">
            <Image alt="Logo" className="rounded-2xl" src={staticMap} />
            <Stack className="absolute top-11 w-full items-center">
              <Autocomplete
                disablePortal
                className="w-4/5 bg-common-white"
                options={options}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
