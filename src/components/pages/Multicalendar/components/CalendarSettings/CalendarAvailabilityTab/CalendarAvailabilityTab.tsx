import { useState } from "react";

import Link from "next/link";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { FormControl } from "@/components/atoms/FormControl";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { useToggle } from "@/hooks/useToggle";

export function CalendarAvailabilityTab() {
  const [selectedValue, setSelectedValue] = useState("female");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const { toggle: toggleDropdown, value: showDropdown } = useToggle({
    initialValue: false,
  });
  const [savedValue, setSavedValue] = useState("Same day");
  const handleSave = () => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );
    if (selectedOption) {
      setSavedValue(selectedOption.label);
    }
    toggleDropdown();
  };

  const options = [
    { label: "Same day", value: "Same day" },
    { label: "At least 1 day", value: "At least 1 day" },
    { label: "At least 2 day", value: "At least 2 day" },
    { label: "At least 3 day", value: "At least 3 day" },
    { label: "At least 7 day", value: "At least 7 day" },
  ];
  return (
    <Stack className="gap-8">
      <Stack className="gap-4">
        <Typography variant="h2">Trip length</Typography>
        <Box>
          <Link href="#">
            <Box className="space-y-2 rounded-t-2xl border border-divider px-6 py-4">
              <Typography variant="body2">Minimum nights</Typography>
              <Typography className="text-3xl font-bold">1</Typography>
            </Box>
          </Link>
          <Link href="#">
            <Box className="space-y-2 rounded-b-2xl border border-t-0 border-divider px-6 py-4">
              <Typography variant="body2">Maximum nights</Typography>
              <Typography className="text-3xl font-bold">365</Typography>
            </Box>
          </Link>
        </Box>
        <Link href="#">
          <Box className="rounded-2xl border border-divider p-6">
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">Custom trip lengths</Typography>
              </Box>
              <KeyboardArrowRightIcon className="c-keyboard-arrow-icon size-7 text-text-primary" />
            </Stack>
          </Box>
        </Link>
      </Stack>
      <Stack className="gap-4">
        <Typography variant="h2">Availability</Typography>
        <Box className="relative">
          <Box
            className="cursor-pointer rounded-2xl border border-divider p-6"
            onClick={toggleDropdown}
          >
            <Stack className="flex-row items-center justify-between">
              <Box>
                <Typography variant="body2">Advance notice</Typography>
                <Typography className="mt-1 font-medium" variant="body2">
                  {savedValue}
                </Typography>
              </Box>
              <KeyboardArrowDownIcon
                className={`c-keyboard-arrow-icon size-7 text-text-primary transition-transform duration-200 ease-in-out ${showDropdown ? "rotate-180" : "rotate-0"}`}
              />
            </Stack>
          </Box>
          <Box
            className={`absolute top-0 z-10 w-full cursor-pointer rounded-2xl border border-divider bg-common-white shadow-button ${showDropdown ? "visible" : "invisible"}`}
            onClick={toggleDropdown}
          >
            <Stack className="flex-row items-center justify-between p-6">
              <Box>
                <Typography variant="body2">Advance notice</Typography>
                <Typography
                  className="mt-1 text-text-secondary "
                  variant="body2"
                >
                  How much notice do you need between a guest’s booking and
                  their arrival?
                </Typography>
              </Box>
              <KeyboardArrowDownIcon
                className={`c-keyboard-arrow-icon size-7 text-text-primary transition-transform duration-200 ease-in-out ${showDropdown ? "rotate-180" : "rotate-0"}`}
              />
            </Stack>
            <Divider />
            <Box>
              <FormControl
                className={`w-full overflow-auto transition-[max-height] duration-300 ease-in-out ${showDropdown ? "max-h-44" : "max-h-0"}`}
              >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      classes={{ label: "font-medium text-sm" }}
                      className={`mx-0 flex-row-reverse justify-between px-6 py-3 hover:bg-action-hover ${
                        selectedValue === option.value ? "bg-action-hover" : ""
                      }`}
                      control={<Radio className="p-0" />}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
            <Divider />
            <Box className="px-6 py-4">
              <Button
                className="w-full"
                size="large"
                variant="contained"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}
