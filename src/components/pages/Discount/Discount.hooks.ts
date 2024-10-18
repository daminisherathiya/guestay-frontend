import { useState } from "react";

export function useDiscount() {
  const [isDiscountsDialogOpen, setDiscountsDialogOpen] = useState(false);

  const handleOpenDiscountsDialog = () => {
    setDiscountsDialogOpen(true);
  };

  const handleCloseDiscountsDialog = () => {
    setDiscountsDialogOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    e.target.value = value;
  };
  return {
    handleCloseDiscountsDialog,
    handleInput,
    handleOpenDiscountsDialog,
    isDiscountsDialogOpen,
  };
}
