import { useState } from "react";

export function useAmenities() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleButtonClick = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((option) => option !== value),
      );
    } else {
      setSelectedOptions((prevSelected) => [...prevSelected, value]);
    }
  };
  return { handleButtonClick, selectedOptions };
}
