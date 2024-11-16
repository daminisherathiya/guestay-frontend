import { ElementType, forwardRef } from "react";

import MUIAutocomplete, {
  AutocompleteProps as MUIAutocompleteProps,
} from "@mui/material/Autocomplete";

type Value = any; // eslint-disable-line @typescript-eslint/no-explicit-any
type Multiple = boolean;
type DisableClearable = boolean;
type FreeSolo = boolean;
type ChipComponent = ElementType; // Adjust this if you know the exact component type you will use

export interface AutocompleteProps
  extends MUIAutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent
  > {}

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(
  (props, ref) => <MUIAutocomplete ref={ref} {...props} />,
);

Autocomplete.displayName = "Autocomplete";
