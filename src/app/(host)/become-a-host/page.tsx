import Image from "next/image";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import addFile from "/public/images/addFile.svg";
import home from "/public/images/home.jpg";

export default function ListingHomePage() {
  return (
    <Container maxWidth="2xl">
      <Stack>
        <Box className="mx-auto max-w-2xl">
          <Typography className="mb-8" component="h1" variant="h1">
            Welcome back, Damini
          </Typography>
          <Typography className="mb-4" component="h2" variant="h2">
            Finish your listing
          </Typography>
          <Box className="mb-16 space-y-3">
            <Button
              disableRipple
              className="w-full justify-start gap-4 rounded-xl p-6 text-start"
              variant="outlined"
            >
              <Image alt="home" className="size-11 rounded" src={home} />
              <Typography>Your House listing</Typography>
            </Button>
            <Button
              disableRipple
              className="w-full justify-start gap-4 rounded-xl p-6 text-start"
              variant="outlined"
            >
              <Image alt="Home" className="size-11 rounded" src={home} />
              <Typography>Your listing started on 27 September 2024</Typography>
            </Button>
          </Box>
          <Typography className="mb-4" component="h2" variant="h2">
            Start a new listing
          </Typography>
          <Box className="mb-16">
            <Stack className="cursor-pointer flex-row items-center justify-between gap-4 border-b border-divider py-6">
              <Stack className="flex-row items-center gap-4">
                <Image alt="Add" className="size-8 rounded" src={addFile} />
                <Typography>Create a new listing</Typography>
              </Stack>
              <KeyboardArrowRightIcon />
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
