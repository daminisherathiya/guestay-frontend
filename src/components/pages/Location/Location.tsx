"use client";

import Image from "next/image";
import Script from "next/script";

import { useForm } from "react-hook-form";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { CountrySelect } from "@/components/molecules/CountrySelect/CountrySelect";
import { defaultCountry } from "@/components/molecules/CountrySelect/CountrySelect.consts";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper/TextFieldWrapper";
import { useOverview } from "@/hooks/useStaticFooter";
// import { type AddressDetailsType } from "@/types/Location.types";

import { LocationInputWithAutocompleteService } from "./components/LocationInputWithAutocompleteService";
// import { confirmAddressTextFields } from "./Location.const";
import { useLocation } from "./Location.hooks";

export function Location() {
  const {
    // locationsApiData,
    // locationsApiIsFirstLoading,
    LocationsApiSnackbarAlert,
    selectedPlaceDetails,
    setSelectedPlaceDetails,
  } = useLocation();

  const { Footer } = useOverview();

  const {
    control,
    // formState: { isValid },
    // handleSubmit,
    // trigger,
    // watch,
  } = useForm({
    defaultValues: {
      city: selectedPlaceDetails
        ? (selectedPlaceDetails["city"]?.shortName ?? "")
        : "",
      flatHouse: selectedPlaceDetails
        ? (selectedPlaceDetails["flatHouse"]?.shortName ?? "")
        : "",
      landmark: selectedPlaceDetails
        ? (selectedPlaceDetails["landmark"]?.shortName ?? "")
        : "",
      locality: selectedPlaceDetails
        ? (selectedPlaceDetails["locality"]?.shortName ?? "")
        : "",
      pinCode: "",
      state: selectedPlaceDetails
        ? (selectedPlaceDetails["state"]?.shortName ?? "")
        : "",
      street: selectedPlaceDetails
        ? (selectedPlaceDetails["street"]?.shortName ?? "")
        : "",
    },
    mode: "onChange",
  });

  return (
    <>
      <Container maxWidth="2xl">
        {/* eslint-disable-next-line no-constant-condition */}
        {false ? (
          <Box className="mx-auto max-w-2xl">
            <Typography className="mb-2" component="h1" variant="h1">
              Where&apos;s your place located?
            </Typography>
            <Typography
              className="mb-10 text-text-secondary"
              component="h3"
              variant="h3"
            >
              Your address is only shared with guests after they&apos;ve made a
              reservation.
            </Typography>

            <Box className="relative inline-block w-full">
              <Image
                alt="Static Map"
                className="w-full md:rounded-2xl"
                height={500}
                src="/images/staticmap.png"
                width={630}
              />
              <Stack className="absolute top-7 w-full items-center md:top-11">
                <LocationInputWithAutocompleteService
                  setSelectedPlaceDetails={setSelectedPlaceDetails}
                ></LocationInputWithAutocompleteService>
              </Stack>
            </Box>
          </Box>
        ) : (
          <Box className="mx-auto max-w-3xl">
            <Typography className="mb-2" component="h1" variant="h1">
              Confirm your address
            </Typography>
            <Typography
              className="mb-10 text-text-secondary"
              component="h3"
              variant="h3"
            >
              Your address is only shared with guests after they’ve made a
              reservation.
            </Typography>
            <Box className="space-y-4">
              <CountrySelect value={defaultCountry} onChange={() => {}} />
              <TextFieldWrapper
                control={control}
                label="Flat, house, etc. (if applicable)"
                name="flatHouse"
                rules={{ required: "First name is required" }}
              />
              <TextFieldWrapper
                control={control}
                label="Street address"
                name="street"
                rules={{ required: "First name is required" }}
              />
              <TextFieldWrapper
                control={control}
                label="Nearby landmark (if applicable)"
                name="landmark"
                rules={{ required: "First name is required" }}
              />
              <TextFieldWrapper
                control={control}
                label="District/locality (if applicable)"
                name="locality"
                rules={{ required: "First name is required" }}
              />
              <TextFieldWrapper
                control={control}
                label="City / town"
                name="city"
                rules={{ required: "First name is required" }}
              />
              <TextFieldWrapper
                control={control}
                label="State/union territory"
                name="state"
                rules={{ required: "First name is required" }}
              />
              <TextFieldWrapper
                control={control}
                label="PIN code"
                name="pinCode"
                rules={{ required: "First name is required" }}
              />
            </Box>
          </Box>
        )}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />
      </Container>
      {Footer}
      {LocationsApiSnackbarAlert}
    </>
  );
}
