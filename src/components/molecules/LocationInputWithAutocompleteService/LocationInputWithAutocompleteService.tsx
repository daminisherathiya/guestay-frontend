import { useEffect, useState } from "react";

import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Avatar } from "@mui/material";

import { Button } from "@/components/atoms/Button";
import { Paper } from "@/components/atoms/Paper";
import { Popper } from "@/components/atoms/Popper/Popper";
import { TextField } from "@/components/atoms/TextField";

type AutocompleteService = google.maps.places.AutocompleteService;
type GeocoderResult = google.maps.GeocoderResult;
type PlacePrediction = google.maps.places.AutocompletePrediction;
type PlaceService = google.maps.places.PlacesService;

export function LocationInputWithAutocompleteService() {
  const [inputValue, setInputValue] = useState<string>("");
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [autocompleteService, setAutocompleteService] =
    useState<AutocompleteService | null>(null);
  const [placeService, setPlaceService] = useState<PlaceService | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<any>(null);
  console.log(
    "🚀 ~ LocationInputWithAutocompleteService ~ selectedPlaceDetails:",
    selectedPlaceDetails,
  );

  useEffect(() => {
    const initializeGoogleServices = () => {
      if (typeof window !== "undefined" && window.google) {
        const autocompleteService =
          new google.maps.places.AutocompleteService();
        setAutocompleteService(autocompleteService);

        const placesService = new google.maps.places.PlacesService(
          document.createElement("div"),
        );
        setPlaceService(placesService);
      }
    };

    const intervalId = setInterval(() => {
      if (window.google) {
        initializeGoogleServices();
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const fetchPredictions = (value: string) => {
    if (value.length > 0 && autocompleteService) {
      const request = {
        componentRestrictions: { country: "us" },
        input: value,
        types: ["address"],
      };
      autocompleteService.getPlacePredictions(
        request,
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(predictions);
          } else {
            setPredictions([]);
          }
          setOpen(true);
        },
      );
    } else {
      setPredictions([]);
    }
  };

  const findAddressComponent = (
    components: GeocoderResult["address_components"],
    type: string,
  ) => {
    const component = components.find((c) => c.types.includes(type));
    return component
      ? { longName: component.long_name, shortName: component.short_name }
      : { longName: "", shortName: "" };
  };

  const handlePlaceSelect = (placeId: string) => {
    console.log("🚀 ~ handlePlaceSelect ~ placeId:", placeId);
    if (placeService) {
      console.log("🚀 ~ handlePlaceSelect ~ placeService:", placeService);
      const request = {
        fields: ["address_components", "formatted_address"],
        placeId,
      };
      placeService.getDetails(request, (place, status) => {
        console.log("🚀 ~ placeService.getDetails ~ status:", status);
        console.log("🚀 ~ placeService.getDetails ~ place:", place);
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const addressComponents = place.address_components ?? [];

          const address = {
            flatHouse: findAddressComponent(addressComponents, "subpremise"),
            street: findAddressComponent(addressComponents, "route"),
            landmark: findAddressComponent(
              addressComponents,
              "point_of_interest",
            ),
            locality: findAddressComponent(addressComponents, "sublocality"),
            city: findAddressComponent(addressComponents, "locality"),
            state: findAddressComponent(
              addressComponents,
              "administrative_area_level_1",
            ),
            country: findAddressComponent(addressComponents, "country"),
          };
          console.log("🚀 ~ placeService.getDetails ~ address:", address);
          setSelectedPlaceDetails(address);
        }
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    fetchPredictions(value);
    setAnchorEl(event.target.closest(".MuiInputBase-root") as HTMLDivElement);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(event.target.closest(".MuiInputBase-root") as HTMLDivElement);
    setOpen(true);
  };

  const getCurrentLocation = () => {
    console.log("🚀 ~ getCurrentLocation");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Current Address:", data.results[0].formatted_address);
          })
          .catch((error) => console.error("Error:", error));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="mx-auto w-11/12">
      <TextField
        fullWidth
        autoComplete="off"
        placeholder="Enter your address"
        slotProps={{
          input: {
            classes: {
              focused:
                "!rounded-t-2xl !rounded-b-none shadow-none border-b border-divider",
              input: "py-4 md:py-5",
              notchedOutline: "border-none",
            },
            className:
              "bg-common-white rounded-pill shadow-[rgba(0,0,0,0.12)_0px_6px_16px]",
            startAdornment: <LocationOnIcon className="mx-3" />,
          },
        }}
        value={inputValue}
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <Popper
        disablePortal
        anchorEl={anchorEl}
        className="w-11/12"
        open={open || true}
        placement="bottom-start"
      >
        <Paper className="mb-28 rounded-b-2xl rounded-t-none bg-common-white shadow-lg">
          <ul className="list-none py-3">
            <li>
              <Button
                disableRipple
                className="w-full justify-start rounded-none px-4 py-2 text-base font-normal no-underline"
                onClick={getCurrentLocation}
              >
                <Avatar className="mr-3 bg-action-hover">
                  <NearMeIcon className="text-common-black" />
                </Avatar>{" "}
                Use my current location
              </Button>
            </li>

            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                className="flex cursor-pointer items-center px-4 py-2 hover:bg-action-hover"
                onClick={() => handlePlaceSelect(prediction.place_id)}
              >
                <Avatar className="mr-3 bg-action-hover">
                  <ApartmentIcon className="w-5 text-common-black" />
                </Avatar>
                {prediction.description}
              </li>
            ))}
          </ul>
          {selectedPlaceDetails && (
            <div className="mt-4">
              <h3>Selected Address Details:</h3>
              <p>Flat/House: {selectedPlaceDetails.flatHouse.shortName}</p>
              <p>Street Address: {selectedPlaceDetails.street.shortName}</p>
              <p>Nearby Landmark: {selectedPlaceDetails.landmark.shortName}</p>
              <p>
                District/Locality: {selectedPlaceDetails.locality.shortName}
              </p>
              <p>City/Town: {selectedPlaceDetails.city.shortName}</p>
              <p>State: {selectedPlaceDetails.state.shortName}</p>
              <p>Country: {selectedPlaceDetails.country.shortName}</p>
            </div>
          )}
        </Paper>
      </Popper>
    </div>
  );
}

export default LocationInputWithAutocompleteService;
