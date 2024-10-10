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
type PlacePrediction = google.maps.places.AutocompletePrediction;

export function LocationInputWithAutocompleteService() {
  const [inputValue, setInputValue] = useState<string>("");
  console.log(
    "🚀 ~ LocationInputWithAutocompleteService ~ inputValue:",
    inputValue,
  );
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [autocompleteService, setAutocompleteService] =
    useState<AutocompleteService | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const initializeAutocompleteService = () => {
      if (typeof window !== "undefined" && window.google) {
        const service = new google.maps.places.AutocompleteService();
        setAutocompleteService(service);
      }
    };

    const intervalId = setInterval(() => {
      if (window.google) {
        initializeAutocompleteService();
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const fetchPredictions = (value: string) => {
    console.log("🚀 ~ fetchPredictions ~ value:", value);
    if (value.length > 0 && autocompleteService) {
      const request = {
        componentRestrictions: { country: "us" },
        input: value,
        types: ["address"],
      };
      autocompleteService.getPlacePredictions(
        request,
        (predictions, status) => {
          console.log("🚀 ~ fetchPredictions ~ predictions:", predictions);
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
              focused: "!rounded-t-2xl !rounded-b-none shadow-none border-b border-divider",
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
        open={open}
        placement="bottom-start"
      >
        <Paper className="bg-common-white shadow-lg rounded-t-none rounded-b-2xl mb-28">
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
              >
                <Avatar className="mr-3 bg-action-hover">
                  <ApartmentIcon className="w-5 text-common-black" />
                </Avatar>
                {prediction.description}
              </li>
            ))}
          </ul>
        </Paper>
      </Popper>
    </div>
  );
}

export default LocationInputWithAutocompleteService;
