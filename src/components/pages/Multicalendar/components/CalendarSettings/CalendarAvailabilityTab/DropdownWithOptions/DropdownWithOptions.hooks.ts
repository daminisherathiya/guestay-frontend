import { ChangeEvent, useState } from "react";

import { useToggle } from "@/hooks/useToggle";

import { useDropdownWithOptionsProps } from "./DropdownWithOptions.types";

export function useDropdownWithOptions({
  options,
}: useDropdownWithOptionsProps) {
  const [selectedValue, setSelectedValue] = useState<string>(options[0].label);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const { toggle: toggleDropdown, value: showDropdown } = useToggle({
    initialValue: false,
  });

  const [savedValue, setSavedValue] = useState<string>(options[0].label);

  const handleSave = () => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );
    if (selectedOption) {
      setSavedValue(selectedOption.label);
    }

    toggleDropdown();
  };

  return {
    handleChange,
    handleSave,
    savedValue,
    selectedValue,
    showDropdown,
    toggleDropdown,
  };
}
