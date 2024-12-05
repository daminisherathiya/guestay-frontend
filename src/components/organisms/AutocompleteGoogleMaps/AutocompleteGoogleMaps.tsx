import { useEffect, useMemo, useRef, useState } from "react";

import ApartmentIcon from "@mui/icons-material/Apartment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { debounce } from "@mui/material/utils";
import parse from "autosuggest-highlight/parse";
import { Controller, FieldValues } from "react-hook-form";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Avatar } from "@/components/atoms/Avatar";
import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";
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
  const [value, setValue] = useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [options, setOptions] = useState<PlaceType[]>([]);
  const loaded = useRef<boolean>(false);

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

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: PlaceType[]) => void,
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

  useEffect(() => {
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

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        let newOptions: PlaceType[] = [];

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
                <Stack className="flex-row gap-3">
                  <Box className="flex cursor-pointer items-center hover:bg-action-hover">
                    <Avatar className=" bg-action-hover">
                      <ApartmentIcon className="w-6 text-common-black" />
                    </Avatar>
                  </Box>
                  <Box>
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        className={`${part.highlight ? "font-bold" : "font-normal"}`}
                        component="span"
                      >
                        {part.text}
                      </Box>
                    ))}
                    <Typography className="text-text-secondary" variant="body2">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Box>
                </Stack>
              </li>
            );
          }}
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
