"use client";

import Image from "next/image";
import Script from "next/script";

import { Controller } from "react-hook-form";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
// import { CountrySelect } from "@/components/molecules/CountrySelect/CountrySelect";
// import { defaultCountry } from "@/components/molecules/CountrySelect/CountrySelect.consts";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper/TextFieldWrapper";
// import { type AddressDetailsType } from "@/types/Location.types";

import DraggableMap from "./components/DraggableMap/DraggableMap";
import { INITIAL_MAP_POSITION } from "./components/DraggableMap/DraggableMap.consts";
import { LocationInputWithAutocompleteService } from "./components/LocationInputWithAutocompleteService";
// import { confirmAddressTextFields } from "./Location.const";
import { useLocation } from "./Location.hooks";

export function Location() {
  const {
    control,
    Footer,
    latitude,
    locations,
    // locationsApiData,
    // locationsApiIsFirstLoading,
    LocationsApiSnackbarAlert,
    longitude,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    // selectedPlaceDetails,
    setLatitude,
    setLongitude,
    setSelectedPlaceDetails,
  } = useLocation();

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
              <Controller
                control={control}
                name="locationId"
                render={({ field }) => (
                  <Autocomplete
                    // open
                    {...field}
                    disableClearable
                    getOptionLabel={(option) => {
                      return option.label;
                    }}
                    options={locations}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Location" />
                    )}
                    renderOption={(props, option) => {
                      return (
                        <li
                          {...props}
                          key={option.id}
                          className={option.parent !== "0" ? "ml-6" : "ml-2"}
                        >
                          {option.label}
                        </li>
                      );
                    }}
                    value={
                      locations.find(
                        (location) => location.id === field.value,
                      ) || null
                    }
                    onChange={(_, newValue) => {
                      field.onChange(newValue ? newValue.id : null);
                    }}
                  />
                )}
              />
              {/* <CountrySelect value={defaultCountry} onChange={() => {}} /> */}
              <TextFieldWrapper
                control={control}
                label="Address"
                name="address"
                rules={{ required: "Address is required" }}
              />
            </Box>
            <div>Latitude: {latitude || INITIAL_MAP_POSITION.lat}</div>
            <div>Longitude: {longitude || INITIAL_MAP_POSITION.lng}</div>
            <DraggableMap
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          </Box>
        )}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />
      </Container>
      {Footer}
      {LocationsApiSnackbarAlert}
      {PropertyApiSnackbarAlert}
      {SavePropertyApiSnackbarAlert}
    </>
  );
}
