import { Box, Container, Stack, Typography } from "@mui/material";

export default function AboutYourPlace() {
  return (
    <Container maxWidth="2xl">
      <Stack>
        <Box className="mx-auto w-11/12">
          <Stack className="flex-row items-center">
            <Box className="w-1/2">
              <Typography className="mb-4 font-medium" variant="h3">
                Step 1
              </Typography>
              <Typography className="mb-6 text-5xl" component="h1" variant="h1">
                Tell us about your place
              </Typography>
              <Typography className="leading-7" variant="h3">
                In this step, we&apos;ll ask you which type of property you have
                and if guests will book the entire place or just a room. Then
                let us know the location and how many guests can stay.
              </Typography>
            </Box>
            <Box className="w-1/2">
              <video
                autoPlay
                muted
                playsInline
                className="object-cover"
                preload="auto"
                width="600"
              >
                <source
                  src="/images/aboutYourPlaceVideo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
