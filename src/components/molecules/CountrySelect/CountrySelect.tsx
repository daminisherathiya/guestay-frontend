"use client";

import Image from "next/image";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Box } from "@/components/atoms/Box";
import { TextField } from "@/components/atoms/TextField";

import { countries } from "./CountrySelect.consts";
import { CountrySelectProps } from "./CountrySelect.types";

export function CountrySelect({
  index = 0,
  focusedInputIndex = 0,
  totalFields = 1,
}: CountrySelectProps) {
  return (
    <Autocomplete
      autoHighlight
      getOptionLabel={(option) => option.label}
      id="country-select"
      options={countries}
      popupIcon={<KeyboardArrowDownIcon />}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country/region"
          slotProps={{
            input: {
              ...params.InputProps,
              classes: {
                focused: "before:border-y-common-transparent",
              },
              className: `before:h-full ${
                index === 0 ? "before:rounded-t-lg" : ""
              } ${
                index === totalFields - 1
                  ? "before:rounded-b-lg before:!border-b"
                  : ""
              } ${
                focusedInputIndex === index - 1 ? "before:border-t-0" : ""
              } bg-common-white before:border-x before:border-b-0 before:border-t before:border-common-black/45 before:transition-none after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none`,
            },
          }}
          variant="filled"
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" {...optionProps}>
            <Image
              alt={option.label}
              className="mr-4 shrink-0"
              height={15}
              loading="lazy"
              priority={false}
              quality={75}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              width={20}
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        );
      }}
    />
  );
}
