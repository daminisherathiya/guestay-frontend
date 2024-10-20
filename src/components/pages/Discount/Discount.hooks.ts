import { useState } from "react";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";

export function useDiscount() {
  const {
    value: discountsDialogIsOpen,
    setTrue: setDiscountsDialogIsOpenTrue,
    setFalse: setDiscountsDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const [weeklyDiscount, setWeeklyDiscount] = useState(8);
  const [monthlyDiscount, setMonthlyDiscount] = useState(15);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "weekly" | "monthly",
  ) => {
    // Ensure the target is an HTMLInputElement
    if (!(e.target instanceof HTMLInputElement)) return;

    let value = e.target.value;

    // Sanitize the input to allow only numbers and limit to two digits
    value = value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    // Set the sanitized value back to the input
    e.target.value = value;

    // Update the corresponding state based on the type
    if (type === "weekly") {
      setWeeklyDiscount(parseInt(value, 10) || 0);
    } else if (type === "monthly") {
      setMonthlyDiscount(parseInt(value, 10) || 0);
    }
  };

  return {
    discountsDialogIsOpen,
    handleInput,
    monthlyDiscount,
    setDiscountsDialogIsOpenFalse,
    setDiscountsDialogIsOpenTrue,
    weeklyDiscount,
  };
}
