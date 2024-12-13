import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Divider } from "@/components/atoms/Divider";
import { MenuItem } from "@/components/atoms/MenuItem";
import { OutlinedInput } from "@/components/atoms/OutlinedInput";
import { Select } from "@/components/atoms/Select/Select";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { DialogWrapper } from "@/components/molecules/DialogWrapper/DialogWrapper";

import { PriceBreakdownDialogProps } from "./PriceBreakdownDialog.types";

const showOptions = [
  { label: "Month", value: 1 },
  { label: "Year", value: 2 },
];

export function PriceBreakdownDialog({
  setPriceBreakdownDialogIsOpenFalse,
  priceBreakdownDialogIsOpen,
}: PriceBreakdownDialogProps) {
  return (
    <DialogWrapper
      handleCloseDialog={setPriceBreakdownDialogIsOpenFalse}
      isDialogOpen={priceBreakdownDialogIsOpen}
      maxWidth="sm"
      title="2 nights · 19–20 Dec"
    >
      <Typography className="mb-2 text-3xl" variant="h1">
        Price breakdown
      </Typography>
      <Typography className="text-text-secondary">
        Adjust guests and pets and we’ll show you the final price.
      </Typography>
      <Select
        classes={{
          icon: "w-5 right-3",
          select: "pl-4 pr-8 py-1.5 max-w-72",
        }}
        IconComponent={KeyboardArrowDownIcon}
        id="demo-simple-select"
        input={
          <OutlinedInput
            classes={{
              notchedOutline: "rounded-pill",
            }}
          />
        }
        labelId="demo-simple-select-label"
        MenuProps={{
          anchorOrigin: {
            horizontal: "right",
            vertical: "bottom",
          },
          classes: {
            list: "max-h-[21.875rem] overflow-auto w-44",
            paper: "rounded-xl mt-2",
          },
          transformOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        }}
        renderValue={(value) => {
          const selected = showOptions.find((option) => option.value === value);
          return (
            <Stack className="flex-row items-center gap-3">
              <Typography className="truncate" variant="body2">
                {selected?.label}
              </Typography>
              <Divider
                flexItem
                className="mr-0.5 h-3"
                orientation="vertical"
                variant="middle"
              />
            </Stack>
          );
        }}
        // value={selectedShowOptionValue}
        // onChange={handleShowOptionChange}
      >
        {showOptions.map((option) => (
          <MenuItem
            key={option.value}
            className="px-6 py-4"
            value={option.value}
          >
            <Stack className="w-full flex-row items-center">
              <Stack className="w-full flex-row items-center justify-between gap-2">
                <Typography
                  className="line-clamp-2 text-wrap font-medium"
                  variant="body2"
                >
                  {option.label}
                </Typography>
              </Stack>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </DialogWrapper>
  );
}
