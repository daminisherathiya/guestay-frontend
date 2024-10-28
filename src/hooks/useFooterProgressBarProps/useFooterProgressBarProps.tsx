"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { LinearProgress } from "@/components/atoms/LinearProgress";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";

import { useFooterProgressBarProps } from "./useFooterProgressBarProps.types";

interface FooterDetailsType {
  backUrl: string;
  nextUrl: string;
  progressPercentage: {
    setp1: number;
    setp2: number;
    setp3: number;
  };
}

/* eslint-disable sort-keys */
const urlToFooterDetails: Record<string, FooterDetailsType> = {
  // Step 1
  "/become-a-host/overview": {
    backUrl: "/become-a-host",
    nextUrl: "/become-a-host/about-your-place",
    progressPercentage: {
      setp1: 0,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/about-your-place": {
    backUrl: "/become-a-host/overview",
    nextUrl: "/become-a-host/structure",
    progressPercentage: {
      setp1: 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/structure": {
    backUrl: "/become-a-host/about-your-place",
    nextUrl: "/become-a-host/location",
    progressPercentage: {
      setp1: 2 * 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/location": {
    backUrl: "/become-a-host/structure",
    nextUrl: "/become-a-host/floor-plan",
    progressPercentage: {
      setp1: 3 * 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/floor-plan": {
    backUrl: "/become-a-host/location",
    nextUrl: "/become-a-host/stand-out",
    progressPercentage: {
      setp1: 5 * 16.66,
      setp2: 0,
      setp3: 0,
    },
  },
  "/become-a-host/stand-out": {
    backUrl: "/become-a-host/floor-plan",
    nextUrl: "/become-a-host/amenities",
    progressPercentage: {
      setp1: 100,
      setp2: 0,
      setp3: 0,
    },
  },
  // Step 2
  "/become-a-host/amenities": {
    backUrl: "/become-a-host/stand-out",
    nextUrl: "/become-a-host/photos",
    progressPercentage: {
      setp1: 100,
      setp2: 1 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/photos": {
    backUrl: "/become-a-host/amenities",
    nextUrl: "/become-a-host/title",
    progressPercentage: {
      setp1: 100,
      setp2: 2 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/title": {
    backUrl: "/become-a-host/photos",
    nextUrl: "/become-a-host/description",
    progressPercentage: {
      setp1: 100,
      setp2: 3 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/description": {
    backUrl: "/become-a-host/title",
    nextUrl: "/become-a-host/finish-setup",
    progressPercentage: {
      setp1: 100,
      setp2: 4 * 20,
      setp3: 0,
    },
  },
  "/become-a-host/finish-setup": {
    backUrl: "/become-a-host/description",
    nextUrl: "/become-a-host/price",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 0,
    },
  },
  // Step 3
  "/become-a-host/price": {
    backUrl: "/become-a-host/finish-setup",
    nextUrl: "/become-a-host/discount",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 1 * 25,
    },
  },
  "/become-a-host/discount": {
    backUrl: "/become-a-host/price",
    nextUrl: "/become-a-host/receipt",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 2 * 25,
    },
  },
  "/become-a-host/receipt": {
    backUrl: "/become-a-host/discount",
    nextUrl: "/become-a-host/publish",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 3 * 25,
    },
  },
  "/become-a-host/publish": {
    backUrl: "/become-a-host/receipt",
    nextUrl: "/become-a-host/",
    progressPercentage: {
      setp1: 100,
      setp2: 100,
      setp3: 100,
    },
  },
};
/* eslint-enable sort-keys */

export function useFooterProgressBar({
  onSubmit,
  isDisabled,
  isLoading,
}: useFooterProgressBarProps) {
  const pathname = usePathname();

  const footerDetails = urlToFooterDetails[pathname] || {
    backUrl: "/",
    nextUrl: "/",
    progressPercentage: { setp1: 0, setp2: 0, setp3: 0 },
  };

  const Footer = (
    <Box className="fixed bottom-0 z-10 w-full bg-common-white">
      <Stack className="flex-row gap-x-1.5">
        <LinearProgress
          classes={{ bar: "bg-common-black" }}
          className="h-1.5 grow bg-divider"
          value={footerDetails.progressPercentage.setp1}
          variant="determinate"
        />
        <LinearProgress
          classes={{ bar: "bg-common-black" }}
          className="h-1.5 grow bg-divider"
          value={footerDetails.progressPercentage.setp2}
          variant="determinate"
        />
        <LinearProgress
          classes={{ bar: "bg-common-black" }}
          className="h-1.5 grow bg-divider"
          value={footerDetails.progressPercentage.setp3}
          variant="determinate"
        />
      </Stack>
      <Container maxWidth="2xl">
        <Stack className="flex-row items-center justify-between py-4">
          <Box>
            <Link href={footerDetails.backUrl}>
              <Button className="text-base" variant="text">
                Back
              </Button>
            </Link>
          </Box>
          <Box>
            <LoadingButton
              disabled={isDisabled}
              loading={isLoading}
              loadingIndicator="Saving..."
              size="large"
              type="submit"
              variant="contained"
              onClick={onSubmit}
            >
              Next
            </LoadingButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );

  return { Footer, nextUrl: footerDetails.nextUrl };
}
