import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { FormControl } from "@/components/atoms/FormControl";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";
import { useToggle } from "@/hooks/useToggle";

const options = [
  { label: "Same day", value: "Same day" },
  { label: "At least 1 day", value: "At least 1 day" },
  { label: "At least 2 day", value: "At least 2 day" },
  { label: "At least 3 day", value: "At least 3 day" },
  { label: "At least 7 day", value: "At least 7 day" },
];

export function DropdownWithOptions({ title, descriptions }) {
  const [selectedValue, setSelectedValue] = useState("Same day");

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

  return (
    <Box className="relative">
      <Box
        className="cursor-pointer rounded-2xl border border-divider p-6"
        onClick={toggleDropdown}
      >
        <Stack className="flex-row items-center justify-between">
          <Box>
            <Typography variant="body2">{title}</Typography>
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
      >
        <Stack
          className="flex-row items-center justify-between p-6"
          onClick={toggleDropdown}
        >
          <Box>
            <Typography variant="body2">{title}</Typography>
            <Typography className="mt-1 text-text-secondary " variant="body2">
              {descriptions}
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
  );
}