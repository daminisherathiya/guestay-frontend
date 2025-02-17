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
import { getDefaultPropertyTitle, getPropertyImageUrl } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { NUMBER_OF_PROPERTIES_TO_SHOW } from "./ListingHome.consts";
import { useListingHome } from "./ListingHome.hooks";
import { getListingPropertiesListType } from "./ListingHome.types";

export function ListingHome() {
  const {
    listingFinishedProperties,
    listingPropertiesApiIsFirstLoading,
    listingUnfinishedProperties,
    router,
    showMoreFihished,
    showMoreUnfihished,
    toggleFihishedShowMore,
    toggleUnfihishedShowMore,
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

  const getListingPropertiesList = ({
    listingProperties,
    showMore,
  }: getListingPropertiesListType) => {
    return listingProperties.map((listingProperty, index) => {
      const coverImage = listingProperty?.images.split(",")[0] || "";

      return (
        <Button
          key={listingProperty.id}
          disableRipple
          className={`w-full justify-start gap-4 rounded-xl p-6 text-start ${showMore && index >= NUMBER_OF_PROPERTIES_TO_SHOW ? "hidden" : ""}`}
          variant="outlined"
          onClick={() => router.push(listingProperty.nextListingStepUrl)}
        >
          {coverImage ? (
            <Image
              alt="home"
              className="size-11 rounded object-cover"
              height={44}
              src={getPropertyImageUrl({
                imageName: coverImage,
                width: 100,
              })}
              width={44}
            />
          ) : (
            <Image
              alt="home"
              className="rounded"
              height={44}
              src="/images/home.jpg"
              width={44}
            />
          )}
          <Typography>
            {listingProperty.title ||
              getDefaultPropertyTitle({
                createdAt: listingProperty.created_at,
              })}
          </Typography>
        </Button>
      );
    });
  };

  const unfinishedListingPropertiesJSX = getListingPropertiesList({
    listingProperties: listingUnfinishedProperties,
    showMore: showMoreUnfihished,
  });

  const finishedListingPropertiesJSX = getListingPropertiesList({
    listingProperties: listingFinishedProperties,
    showMore: showMoreFihished,
  });

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="flex min-h-[calc(100vh-6.375rem)] flex-col items-center justify-center">
          <Box className="mx-auto my-5 w-full max-w-2xl">
            <Typography className="mb-8" component="h1" variant="h1">
              Welcome back, {getUserDetails().fname}
            </Typography>

            {(listingUnfinishedProperties.length > 0 ||
              listingPropertiesApiIsFirstLoading) && (
              <>
                <Typography className="mb-4" component="h2" variant="h2">
                  Finish your listing
                </Typography>
                <Box className="mb-16 space-y-3">
                  {listingPropertiesApiIsFirstLoading
                    ? getSkeleton()
                    : unfinishedListingPropertiesJSX}
                  {listingUnfinishedProperties.length >
                    NUMBER_OF_PROPERTIES_TO_SHOW && (
                    <Button
                      className="p-0 hover:bg-common-white"
                      variant="text"
                      onClick={toggleUnfihishedShowMore}
                    >
                      {showMoreUnfihished ? "Show all" : "Show less"}
                    </Button>
                  )}
                </Box>
              </>
            )}

            <Typography className="mb-4" component="h2" variant="h2">
              Start a new listing
            </Typography>
            <Box className="mb-12">
              <Link href="/become-a-host/overview/">
                <Stack className="cursor-pointer flex-row items-center justify-between gap-4 border-divider py-6 md:border-b">
                  <Stack className="flex-row items-center gap-4">
                    <Image
                      alt="Add listing"
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

            {listingFinishedProperties.length > 0 && (
              <>
                <Typography className="mb-4" component="h2" variant="h2">
                  Pending approval
                </Typography>
                <Box className="mb-16 space-y-3">
                  {listingPropertiesApiIsFirstLoading
                    ? getSkeleton()
                    : finishedListingPropertiesJSX}
                  {listingFinishedProperties.length >
                    NUMBER_OF_PROPERTIES_TO_SHOW && (
                    <Button
                      className="p-0 hover:bg-common-white"
                      variant="text"
                      onClick={toggleFihishedShowMore}
                    >
                      {showMoreFihished ? "Show all" : "Show less"}
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
