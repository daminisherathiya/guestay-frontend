import { useEffect, useState } from "react";

import { Button } from "@/components/atoms/Button";
import { Paper } from "@/components/atoms/Paper";
import { Popper } from "@/components/atoms/Popper/Popper";
import { TextField } from "@/components/atoms/TextField";

type AutocompleteService = google.maps.places.AutocompleteService;
type PlacePrediction = google.maps.places.AutocompletePrediction;

export function LocationInputWithAutocompleteService() {
  const [inputValue, setInputValue] = useState<string>("");
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
    setAnchorEl(event.currentTarget);
  };

  const handleBlur = () => {
    setOpen(false);
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
    <div className="mx-auto w-full max-w-md">
      <TextField
        fullWidth
        className="mb-4"
        label="Enter your address"
        value={inputValue}
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Popper
        disablePortal
        anchorEl={anchorEl}
        open={open || true}
        placement="bottom-start"
      >
        <Paper className="mt-2 w-full bg-common-white shadow-lg">
          <ul className="list-none p-4">
            <li className="pb-2">
              <Button className="w-full text-left" onClick={getCurrentLocation}>
                Use my current location
              </Button>
            </li>

            {predictions.map((prediction) => (
              <li key={prediction.place_id} className="cursor-pointer pb-2">
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
