"use client";

import Image from "next/image";
// import Script from "next/script";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Controller } from "react-hook-form";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { Stack } from "@/components/atoms/Stack";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";
// import { CountrySelect } from "@/components/molecules/CountrySelect/CountrySelect";
// import { defaultCountry } from "@/components/molecules/CountrySelect/CountrySelect.consts";
// import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper/TextFieldWrapper";
// import { type AddressDetailsType } from "@/types/Location.types";
import AutocompleteGoogleMaps from "@/components/organisms/AutocompleteGoogleMaps/AutocompleteGoogleMaps";

import { DraggableMap } from "./components/DraggableMap/DraggableMap";
import { INITIAL_MAP_POSITION } from "./components/DraggableMap/DraggableMap.consts";
import { LocationInputWithAutocompleteService } from "./components/LocationInputWithAutocompleteService";
// import { confirmAddressTextFields } from "./Location.const";
import { useLocation } from "./Location.hooks";

export function Location() {
  const {
    control,
    Footer,
    latitude,
    location,
    locationHasChanged,
    locations,
    // locationsApiIsFirstLoading,
    longitude,
    // selectedPlaceDetails,
    setLatitude,
    setLocationHasChangedTrue,
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
            <Grid2 container className="items-center" spacing={2}>
              <Grid2 size={12}>
                <Controller
                  control={control}
                  name="locationId"
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disableClearable
                      classes={{ popper: "z-[1]" }}
                      getOptionLabel={(option) => {
                        return option.label;
                      }}
                      options={locations}
                      popupIcon={<KeyboardArrowDownIcon />}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Location"
                          slotProps={{
                            input: {
                              ...params.InputProps,
                              className: `${params.InputProps.className} bg-common-white before:h-full before:rounded-lg before:border before:border-solid before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none`,
                            },
                          }}
                          variant="filled"
                        />
                      )}
                      renderOption={(props, option) => {
                        const isSelected = field.value === option.id;
                        return (
                          <li
                            {...props}
                            key={option.id}
                            className={`${option.parent !== "0" ? "pl-6" : "pl-2 font-medium"} cursor-pointer py-1 hover:bg-action-hover ${
                              isSelected ? "bg-action-selected" : ""
                            }`}
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
                        setLocationHasChangedTrue();
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={12}>
                <AutocompleteGoogleMaps
                  control={control}
                  label="Address"
                  name="address"
                  rules={{ required: "Address is required" }}
                />
                {/* <TextFieldWrapper
                  control={control}
                  label="Address"
                  name="address"
                  rules={{ required: "Address is required" }}
                /> */}
              </Grid2>
              <Grid2 size={{ "2xs": 12, sm: 6 }}>
                <TextField
                  disabled
                  className="w-full"
                  label="Latitude"
                  slotProps={{
                    formHelperText: { className: "mt-0 mx-2" },
                    input: {
                      className:
                        "bg-common-white before:h-full before:rounded-lg before:border before:border-solid before:border-common-black/45",
                    },
                  }}
                  value={
                    latitude !== null ? latitude : INITIAL_MAP_POSITION.lat
                  }
                  variant="filled"
                />
              </Grid2>
              <Grid2 size={{ "2xs": 12, sm: 6 }}>
                <TextField
                  disabled
                  className="w-full"
                  label="Longitude"
                  slotProps={{
                    formHelperText: { className: "mt-0 mx-2" },
                    input: {
                      className:
                        "bg-common-white before:h-full before:rounded-lg before:border before:border-solid before:border-common-black/45",
                    },
                  }}
                  value={
                    longitude !== null ? longitude : INITIAL_MAP_POSITION.lng
                  }
                  variant="filled"
                />
              </Grid2>
              <Grid2 size={12}>
                <DraggableMap
                  latitude={latitude}
                  location={location}
                  locationHasChanged={locationHasChanged}
                  longitude={longitude}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              </Grid2>
            </Grid2>
          </Box>
        )}
        {/* <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        /> */}
      </Container>
      {Footer}
    </>
  );
}
