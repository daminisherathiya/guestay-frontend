"use client";
import { useState } from "react";

import Image from "next/image";
import Script from "next/script";

import { Box } from "@/components/atoms/Box";
import { Container } from "@/components/atoms/Container";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { CountrySelect } from "@/components/molecules/CountrySelect/CountrySelect";
import { LocationInputWithAutocompleteService } from "@/components/molecules/LocationInputWithAutocompleteService";
import { TextFieldWrapper } from "@/components/molecules/TextFieldWrapper/TextFieldWrapper";

import { AddressDetails } from "./LocationTypes";

const confirmAddressTextFields = [
  { key: "flatHouse", label: "Flat, house, etc. (if applicable)" },
  { key: "street", label: "Street address" },
  { key: "landmark", label: "Nearby landmark (if applicable)" },
  { key: "locality", label: "District/locality (if applicable)" },
  { key: "city", label: "City / town" },
  { key: "state", label: "State/union territory" },
  { key: "pinCode", label: "PIN code" },
];

export function Location() {
  const [selectedPlaceDetails, setSelectedPlaceDetails] =
    useState<AddressDetails | null>(null);

  const [focusedInputIndex, setFocusedInputIndex] = useState<null | number>(
    null,
  );

  return (
    <Container maxWidth="2xl">
      {selectedPlaceDetails == null ? (
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
          <CountrySelect />
          <Box className="mt-4">
            {confirmAddressTextFields.map((confirmAddressTextField, index) => {
              const fieldKey =
                confirmAddressTextField.key as keyof AddressDetails;
              const value = selectedPlaceDetails
                ? (selectedPlaceDetails[fieldKey]?.shortName ?? "")
                : "";
              return (
                <TextFieldWrapper
                  key={index}
                  focusedInputIndex={focusedInputIndex}
                  handleBlur={() => setFocusedInputIndex(null)}
                  handleFocus={() => setFocusedInputIndex(index)}
                  index={index}
                  label={confirmAddressTextField.label}
                  totalFields={confirmAddressTextFields.length}
                  value={value}
                />
              );
            })}
          </Box>
        </Box>
      )}
      {selectedPlaceDetails && (
        <div className="mt-4">
          <h3>Selected Address Details:</h3>
          <p>Flat/House: {selectedPlaceDetails.flatHouse.shortName}</p>
          <p>Street Address: {selectedPlaceDetails.street.shortName}</p>
          <p>Nearby Landmark: {selectedPlaceDetails.landmark.shortName}</p>
          <p>District/Locality: {selectedPlaceDetails.locality.shortName}</p>
          <p>City/Town: {selectedPlaceDetails.city.shortName}</p>
          <p>State: {selectedPlaceDetails.state.shortName}</p>
          <p>Country: {selectedPlaceDetails.country.shortName}</p>
        </div>
      )}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
      />
    </Container>
  );
}
