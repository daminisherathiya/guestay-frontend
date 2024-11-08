import * as React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { debounce } from "@mui/material/utils";
import parse from "autosuggest-highlight/parse";
import { Controller, FieldValues } from "react-hook-form";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Box } from "@/components/atoms/Box";
import { Grid2 } from "@/components/atoms/Grid2";
import { TextField } from "@/components/atoms/TextField";
import { Typography } from "@/components/atoms/Typography";

import { AutocompleteGoogleMapsProps } from "./AutocompleteGoogleMaps.types";

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService: {
  current: google.maps.places.AutocompleteService | null;
} = {
  current: null,
};

interface MainTextMatchedSubstrings {
  length: number;
  offset: number;
}
interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
  secondary_text: string;
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export default function AutocompleteGoogleMaps<T extends FieldValues>({
  control,
  label,
  name,
  rules,
}: AutocompleteGoogleMapsProps<T>) {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps",
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          {...field}
          autoComplete
          disableClearable
          filterSelectedOptions
          freeSolo
          includeInputInList
          className="w-full"
          filterOptions={(x) => x}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          noOptionsText="No locations"
          options={options}
          popupIcon={<KeyboardArrowDownIcon />}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label={label}
              slotProps={{
                input: {
                  ...params.InputProps,
                  className:
                    "bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none",
                },
              }}
              variant="filled"
            />
          )}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            const matches =
              option.structured_formatting.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match: MainTextMatchedSubstrings) => [
                match.offset,
                match.offset + match.length,
              ]),
            );
            return (
              <li key={key} {...optionProps}>
                <Grid2 container sx={{ alignItems: "center" }}>
                  <Grid2 sx={{ display: "flex", width: 44 }}>
                    <LocationOnIcon sx={{ color: "text.secondary" }} />
                  </Grid2>
                  <Grid2
                    sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                  >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                      >
                        {part.text}
                      </Box>
                    ))}
                    <Typography
                      sx={{ color: "text.secondary" }}
                      variant="body2"
                    >
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid2>
                </Grid2>
              </li>
            );
          }}
          sx={{ width: 300 }}
          // value={value}
          onChange={(event, newValue: PlaceType | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            field.onChange(newInputValue);
          }}
          // value={field.value || []}
          // onChange={(_, newValue) => field.onChange(newValue)}
        />
      )}
      rules={rules}
    />
  );
}
