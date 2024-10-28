"use client";

import Image from "next/image";
import Link from "next/link";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Skeleton } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { NUMBER_OF_PROPERTIES_TO_SHOW } from "./ListingHome.const";
import { useListingHome } from "./ListingHome.hook";

export function ListingHome() {
  const {
    listingPropertiesApiData,
    listingPropertiesApiIsFirstLoading,
    ListingPropertiesApiSnackbarAlert,
    setPropertyIdToEdit,
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
    return (listingPropertiesApiData?.data || []).map(
      (listingProperty, index) => (
        <Button
          key={listingProperty.id}
          disableRipple
          className={`w-full justify-start gap-4 rounded-xl p-6 text-start ${showMore && index >= NUMBER_OF_PROPERTIES_TO_SHOW ? "hidden" : ""}`}
          variant="outlined"
          onClick={() => {
            return setPropertyIdToEdit({
              listing_step: listingProperty.listing_steps,
              propertyIdToEdit: listingProperty.id,
            });
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
      ),
    );
  };

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-2xl">
          <Typography className="mb-8" component="h1" variant="h1">
            Welcome back, Damini
          </Typography>
          <Typography className="mb-4" component="h2" variant="h2">
            Finish your listing
          </Typography>
          <Box className="mb-16 space-y-3">
            {listingPropertiesApiIsFirstLoading
              ? getSkeleton()
              : getPropertiesList()}
            {(listingPropertiesApiData?.data || []).length >
              NUMBER_OF_PROPERTIES_TO_SHOW && (
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
      {ListingPropertiesApiSnackbarAlert}
    </>
  );
}
