import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { OutlinedInput } from "@/components/atoms/OutlinedInput";
import { Select } from "@/components/atoms/Select/Select";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { useSelectWithApplyAndReset } from "./SelectWithApplyAndReset.hooks";
import { SelectWithApplyAndResetProps } from "./SelectWithApplyAndReset.types";

export function SelectWithApplyAndReset({
  children,
  handleReset,
  labelForCount,
  showResetButton,
  onCloseSelectHandler,
  onSaveSelectHandler,
}: SelectWithApplyAndResetProps) {
  const { handleSave, selectOpen, setSelectOpen, totalGuests } =
    useSelectWithApplyAndReset({ onCloseSelectHandler, onSaveSelectHandler });

  return (
    <Select
      classes={{
        icon: "w-5 right-3",
        select: "pl-4 pr-8 py-1.5 max-w-72",
      }}
      IconComponent={KeyboardArrowDownIcon}
      input={<OutlinedInput classes={{ notchedOutline: "rounded-pill" }} />}
      MenuProps={{
        anchorOrigin: { horizontal: "left", vertical: "bottom" },
        classes: {
          list: "max-h-[21.875rem] overflow-auto py-4",
          paper: "rounded-xl mt-2",
        },
        transformOrigin: { horizontal: "left", vertical: "top" },
      }}
      open={selectOpen}
      renderValue={(value: unknown) => {
        const guestCount = typeof value === "number" ? value : 1;
        return (
          <Stack className="flex-row items-center gap-3">
            <Typography className="truncate" variant="body2">
              {guestCount === 0 ? "No" : guestCount} {labelForCount}
              {guestCount !== 1 ? "s" : ""}
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
      value={totalGuests}
      onClose={() => setSelectOpen(false)}
      onOpen={() => setSelectOpen(true)}
    >
      {children}
      <Stack
        className="border-t border-divider px-4 pt-4"
        direction="row"
        justifyContent="space-between"
      >
        {showResetButton && (
          <Button
            className="-ml-2.5 px-2.5 no-underline"
            size="large"
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
        <Button
          className="ml-auto"
          size="large"
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </Stack>
    </Select>
  );
}
