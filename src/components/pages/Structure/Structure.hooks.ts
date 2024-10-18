import { useState } from "react";

export function useStructure() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleButtonClick = (value: string) => {
    setSelectedOption(value);
  };

  return {
    handleButtonClick,
    selectedOption,
  };
}
