import Image from "next/image";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

export default function ListingHome() {
  return (
    <Container maxWidth="2xl">
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
            <Image
              alt="home"
              className="rounded"
              height={44}
              src="/images/home.jpg"
              width={44}
            />
            <Typography>Your House listing</Typography>
          </Button>
          <Button
            disableRipple
            className="w-full justify-start gap-4 rounded-xl p-6 text-start"
            variant="outlined"
          >
            <Image
              alt="Home"
              className="rounded"
              height={44}
              src="/images/home.jpg"
              width={44}
            />
            <Typography>Your listing started on 27 September 2024</Typography>
          </Button>
          <Button className="p-0 hover:bg-common-white" variant="text">
            Show all
          </Button>
        </Box>
        <Typography className="mb-4" component="h2" variant="h2">
          Start a new listing
        </Typography>
        <Box>
          <Stack className="cursor-pointer flex-row items-center justify-between gap-4 border-b border-divider py-6">
            <Stack className="flex-row items-center gap-4">
              <Image
                alt="Add"
                className="rounded"
                height={32}
                src="/images/addFile.svg"
                width={32}
              />
              <Typography>Create a new listing</Typography>
            </Stack>
            <KeyboardArrowRightIcon />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
