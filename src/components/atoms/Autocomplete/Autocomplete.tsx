import React from "react";

import MUIAutocomplete, {
  AutocompleteProps as MUIAutocompleteProps,
} from "@mui/material/Autocomplete";

type Value = unknown; // Adjust this to a more specific type if applicable
type Multiple = boolean;
type DisableClearable = boolean;
type FreeSolo = boolean;
type ChipComponent = React.ElementType; // Adjust this if you know the exact component type you will use

export interface AutocompleteProps
  extends MUIAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > {}

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (props, ref) => <MUIAutocomplete ref={ref} {...props} />,
);

Autocomplete.displayName = "Autocomplete";
