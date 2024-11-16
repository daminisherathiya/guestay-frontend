"use client";

import Image from "next/image";
import Link from "next/link";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import {
  getDefaultPropertyTitle,
  getListingStatusToDisplay,
} from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { NUMBER_OF_PROPERTIES_TO_SHOW } from "./ListingHome.consts";
import { useListingHome } from "./ListingHome.hooks";
import { getNextListingStepUrl } from "./ListingHome.utils";

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

  const getUnfinishedPropertiesList = () => {
    return listingUnfinishedProperties.map((listingProperty, index) => {
      const coverImage = listingProperty?.images.split(",")[0] || "";

      return (
        <Button
          key={listingProperty.id}
          disableRipple
          className={`w-full justify-start gap-4 rounded-xl p-6 text-start ${showMoreUnfihished && index >= NUMBER_OF_PROPERTIES_TO_SHOW ? "hidden" : ""}`}
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
          {coverImage ? (
            <Image
              alt="home"
              className="size-11 rounded object-cover"
              height={44}
              src={`https://guestay.webarysites.com/file/100/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${coverImage}`}
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

  const getFinishedPropertiesList = () => {
    return listingFinishedProperties.map((listingProperty, index) => {
      const coverImage = listingProperty?.images.split(",")[0] || "";
      return (
        <Button
          key={listingProperty.id}
          disableRipple
          className={`w-full justify-between gap-4 rounded-xl p-6 text-start ${showMoreFihished && index >= NUMBER_OF_PROPERTIES_TO_SHOW ? "hidden" : ""}`}
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
          <Stack className="flex-row items-center gap-4">
            {coverImage ? (
              <Image
                alt="home"
                className="size-11 rounded object-cover"
                height={44}
                src={`https://guestay.webarysites.com/file/100/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${coverImage}`}
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
          </Stack>
          <Chip
            classes={{ label: "first-letter:uppercase" }}
            label={getListingStatusToDisplay({
              listingSteps: listingProperty.listing_steps || "",
              status: listingProperty.status,
            })}
          />
        </Button>
      );
    });
  };

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="flex min-h-[calc(100vh-178px)] flex-col items-center justify-center">
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
                    : getUnfinishedPropertiesList()}
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
                  Finished listing
                </Typography>
                <Box className="mb-16 space-y-3">
                  {listingPropertiesApiIsFirstLoading
                    ? getSkeleton()
                    : getFinishedPropertiesList()}
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
