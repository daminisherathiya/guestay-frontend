import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

export function AboutYourPlace() {
  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto md:w-11/12">
        <Stack className="items-center md:flex-row">
          <Box className="order-2 md:order-1 md:w-1/2">
            <Typography className="mb-2 font-medium md:mb-4" variant="h3">
              Step 1
            </Typography>
            <Typography
              className="mb-2 text-3xl md:mb-6 md:text-5xl"
              component="h1"
              variant="h1"
            >
              Tell us about your place
            </Typography>
            <Typography className="leading-7" variant="h3">
              In this step, we&apos;ll ask you which type of property you have
              and if guests will book the entire place or just a room. Then let
              us know the location and how many guests can stay.
            </Typography>
          </Box>
          <Box className="-md:mt-10 order-1 -mt-5 md:order-2 md:mt-0 md:w-1/2">
            <video
              autoPlay
              muted
              playsInline
              className="object-cover"
              preload="auto"
              width="600"
            >
              <source src="/images/aboutYourPlaceVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
