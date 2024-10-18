import { useRef, useState } from "react";
export function usePrice() {
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("2,439");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isMoreAboutPricingDialogOpen, setMoreAboutPricingDialogOpen] =
    useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const togglePriceSection = () => {
    // setIsPriceVisible((prevState) => !prevState);
    setIsPriceVisible(!isPriceVisible);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputFocus = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  const formatNumberWithCommas = (num: string) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    e.target.value = value;
    setValue(formatNumberWithCommas(value));
  };

  const handleOpenMoreAboutPricingDialog = () => {
    setMoreAboutPricingDialogOpen(true);
  };

  const handleCloseMoreAboutPricingDialog = () => {
    setMoreAboutPricingDialogOpen(false);
  };

  // Function to toggle the expanded button
  const toggleExpansion = (buttonIndex: number) => {
    setExpanded(buttonIndex);
  };

  return {
    expanded,
    handleCloseMoreAboutPricingDialog,
    handleEditClick,
    handleInput,
    handleInputBlur,
    handleInputFocus,
    handleOpenMoreAboutPricingDialog,
    inputRef,
    isEditing,
    isMoreAboutPricingDialogOpen,
    isPriceVisible,
    toggleExpansion,
    togglePriceSection,
    value,
  };
}
