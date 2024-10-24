"use client";

import Image from "next/image";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Autocomplete } from "@/components/atoms/Autocomplete";
import { Box } from "@/components/atoms/Box";
import { TextField } from "@/components/atoms/TextField";

import { countries } from "./CountrySelect.consts";
import { CountrySelectProps } from "./CountrySelect.types";

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  return (
    <Autocomplete
      autoHighlight
      disableClearable
      getOptionLabel={(option) => {
        return option.label;
      }}
      isOptionEqualToValue={(option, value) => {
        return option.phone === value.phone;
      }}
      options={countries}
      popupIcon={<KeyboardArrowDownIcon />}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country/region"
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
      value={value}
      onChange={onChange}
    />
  );
}
