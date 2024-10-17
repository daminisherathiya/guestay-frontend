import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

export function StandOut() {
  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto md:w-11/12">
        <Stack className="items-center md:flex-row">
          <Box className="order-2 md:order-1 md:w-1/2">
            <Typography className="mb-2 font-medium md:mb-4" variant="h3">
              Step 2
            </Typography>
            <Typography
              className="mb-2 text-3xl md:mb-6 md:text-5xl"
              component="h1"
              variant="h1"
            >
              Make your place stand out
            </Typography>
            <Typography className="leading-7" variant="h3">
              In this step, you’ll add some of the amenities your place offers,
              plus 5 or more photos. Then you’ll create a title and description.
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
              <source src="/images/standOut.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
