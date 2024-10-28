"use client";
import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { useOverview } from "@/hooks/useStaticFooter";

export function FinishSetup() {
  const { Footer } = useOverview();

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto md:w-11/12">
          <Stack className="items-center md:flex-row">
            <Box className="order-2 md:order-1 md:w-1/2">
              <Typography className="mb-2 font-medium md:mb-4" variant="h3">
                Step 3
              </Typography>
              <Typography
                className="mb-2 text-3xl md:mb-6 md:text-5xl"
                component="h1"
                variant="h1"
              >
                Finish up and publish
              </Typography>
              <Typography className="leading-7" variant="h3">
                Finally, you&apos;ll choose if you&apos;d like to start with an
                experienced guest, then you&apos;ll set your nightly price.
                Answer a few quick questions and publish when you&apos;re ready.
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
                <source src="/images/finishSetupVideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Stack>
        </Box>
      </Container>
      {Footer}
    </>
  );
}
