"use client";

import { useEffect } from "react";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { LinearProgress } from "@/components/atoms/LinearProgress";
import { LoadingButton } from "@/components/atoms/LoadingButton";
import { Stack } from "@/components/atoms/Stack";

import { useFooterProgressBarProps } from "./useFooterProgressBar.types";
import { getFooterDetailsFromUrl } from "./useFooterProgressBar.utils";

export function useFooterProgressBar({
  buttonText = "Next",
  onSubmit,
  isDisabled,
  isLoading,
}: useFooterProgressBarProps) {
  const router = useRouter();

  const { propertyId }: { propertyId: string } = useParams();

  const pathname = usePathname();
  const footerDetails = getFooterDetailsFromUrl({ propertyId, url: pathname });
  console.log("🚀 ~ footerDetails:", footerDetails);

  // const footerDetails = urlToFooterDetails[pathname] || {
  //   backUrl: "/",
  //   nextUrl: "/",
  //   progressPercentage: { setp1: 0, setp2: 0, setp3: 0 },
  // };

  useEffect(() => {
    router.prefetch(footerDetails.nextUrl);
  }, [footerDetails.nextUrl, router]);

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
              className={`${buttonText === "Publish" || buttonText === "Get started" ? "bg-secondary-main" : ""}`}
              disabled={isDisabled}
              loading={isLoading}
              loadingIndicator="Saving..."
              size="large"
              type="submit"
              variant="contained"
              onClick={onSubmit}
            >
              {buttonText}
            </LoadingButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );

  return { Footer, nextUrl: footerDetails.nextUrl };
}
