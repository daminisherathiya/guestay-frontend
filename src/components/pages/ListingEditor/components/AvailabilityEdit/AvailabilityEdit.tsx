import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { FormControl } from "@/components/atoms/FormControl";
import { InputLabel } from "@/components/atoms/InputLabel";
import { MenuItem } from "@/components/atoms/MenuItem";
import { Select } from "@/components/atoms/Select/Select";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { ListingEditableSection } from "../ListingEditableSection";

export function AvailabilityEdit() {
  return (
    <ListingEditableSection title="Pricing">
      <Typography className="mb-12 text-text-secondary">
        These settings apply to all nights, unless you customise them by date.
      </Typography>
      <Stack className="gap-4">
        <Typography className="mb-6 font-medium" variant="h3">
          Trip length
        </Typography>
      </Stack>
      <Stack className="mt-12">
        <Typography className="mb-2 font-medium" variant="h3">
          Advance notice
        </Typography>
        <Typography className="mb-6 text-text-secondary">
          How much notice do you need between a guest’s booking and their
          arrival?
        </Typography>
        <FormControl fullWidth variant="filled">
          <InputLabel>Bedroom Count</InputLabel>
          {/* <Controller */}
          {/* control={control} */}
          {/* name="Advance notice days" render= */}
          {/* {({ field }) => ( */}
          <Select
            // {...field}
            className="bg-common-white before:h-full before:rounded-lg before:border before:border-common-black/45 after:h-full after:rounded-lg after:border-2 after:border-common-black after:transition-none"
            IconComponent={KeyboardArrowDownIcon}
            label="Bedroom Count"
          >
            <MenuItem value="1">Count as full bedroom</MenuItem>
            <MenuItem value="0.5">Count as half bedroom</MenuItem>
            <MenuItem value="0">Do not count as bedroom</MenuItem>
          </Select>
          {/* )} */}
          {/* /> */}
        </FormControl>
      </Stack>
    </ListingEditableSection>
  );
}
