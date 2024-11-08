"use client";

import Image from "next/image";
import Link from "next/link";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { NUMBER_OF_PROPERTIES_TO_SHOW } from "./ListingHome.consts";
import { useListingHome } from "./ListingHome.hooks";
import { getNextListingStepUrl } from "./ListingHome.utils";

export function ListingHome() {
  const {
    listingProperties,
    listingPropertiesApiIsFirstLoading,
    router,
    showMore,
    toggleShowMore,
  } = useListingHome();

  const getSkeleton = () => {
    return Array.from({ length: 2 }).map((_, index) => (
      <Skeleton
        key={index}
        className="w-full rounded-lg"
        height={94}
        variant="rectangular"
      />
    ));
  };

  const getPropertiesList = () => {
    if (listingProperties.length === 0) {
      return <Typography>No property listings to finish</Typography>;
    }

    return listingProperties.map((listingProperty, index) => (
      <Button
        key={listingProperty.id}
        disableRipple
        className={`w-full justify-start gap-4 rounded-xl p-6 text-start ${showMore && index >= NUMBER_OF_PROPERTIES_TO_SHOW ? "hidden" : ""}`}
        variant="outlined"
        onClick={() => {
          const nextListingStepUrl = getNextListingStepUrl({
            propertyIdToEdit: listingProperty.id,
            providedListingSteps: listingProperty.listing_steps || "",
          });
          // window.open(nextListingStepUrl);
          router.push(nextListingStepUrl);
        }}
      >
        <Image
          alt="home"
          className="rounded"
          height={44}
          src="/images/home.jpg"
          width={44}
        />
        <Typography>{listingProperty.title}</Typography>
      </Button>
    ));
  };

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-2xl">
          <Typography className="mb-8" component="h1" variant="h1">
            Welcome back, {getUserDetails().fname}
          </Typography>
          <Typography className="mb-4" component="h2" variant="h2">
            Finish your listing
          </Typography>
          <Box className="mb-16 space-y-3">
            {listingPropertiesApiIsFirstLoading
              ? getSkeleton()
              : getPropertiesList()}
            {listingProperties.length > NUMBER_OF_PROPERTIES_TO_SHOW && (
              <Button
                className="p-0 hover:bg-common-white"
                variant="text"
                onClick={toggleShowMore}
              >
                {showMore ? "Show all" : "Show less"}
              </Button>
            )}
          </Box>
          <Typography className="mb-4" component="h2" variant="h2">
            Start a new listing
          </Typography>
          <Box className="mb-12">
            <Link href="/become-a-host/overview/">
              <Stack className="cursor-pointer flex-row items-center justify-between gap-4 border-divider py-6 md:border-b">
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
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
