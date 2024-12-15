import { useCallback, useState } from "react";

import { Typography } from "@/components/atoms/Typography";
import { CounterWithLabel } from "@/components/molecules/CounterWithLabel";
import { DialogWrapper } from "@/components/molecules/DialogWrapper/DialogWrapper";
import { SelectWithApplyAndReset } from "@/components/molecules/SelectWithApplyAndReset";

import { usePriceBreakdownDialog } from "./PriceBreakdownDialog.hooks";
import { PriceBreakdownDialogProps } from "./PriceBreakdownDialog.types";

export function PriceBreakdownDialog({
  setPriceBreakdownDialogIsOpenFalse,
  priceBreakdownDialogIsOpen,
}: PriceBreakdownDialogProps) {
  const {
    adultsCounters,
    childrenCounters,
    infantsCounters,
    setAdultsCounters,
    setChildrenCounters,
    setInfantsCounters,
  } = usePriceBreakdownDialog();

  const [initialCounters, setInitialCounters] = useState({
    adults: adultsCounters,
    children: childrenCounters,
    infants: infantsCounters,
  });

  const onCloseSelectHandler = useCallback(() => {
    setInitialCounters({
      adults: adultsCounters,
      children: childrenCounters,
      infants: infantsCounters,
    });
  }, [adultsCounters, childrenCounters, infantsCounters]);

  const handleReset = useCallback(() => {
    setAdultsCounters(initialCounters.adults);
    setChildrenCounters(initialCounters.children);
    setInfantsCounters(initialCounters.infants);
  }, [
    initialCounters,
    setAdultsCounters,
    setChildrenCounters,
    setInfantsCounters,
  ]);

  const onSaveSelectHandler = useCallback(() => {
    return adultsCounters + childrenCounters;
  }, [adultsCounters, childrenCounters]);
  const showResetButton =
    adultsCounters !== initialCounters.adults ||
    childrenCounters !== initialCounters.children ||
    infantsCounters !== initialCounters.infants;

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
      <SelectWithApplyAndReset
        handleReset={handleReset}
        showResetButton={showResetButton}
        onCloseSelectHandler={onCloseSelectHandler}
        onSaveSelectHandler={onSaveSelectHandler}
      >
        <CounterWithLabel
          classes={{ counterWithLabel: "p-4", label: "text-base" }}
          counter={adultsCounters}
          description="Ages 13 or above"
          isLoading={false}
          label="Adults"
          maxCount={4}
          minCount={1}
          setCounters={setAdultsCounters}
        />
        <CounterWithLabel
          classes={{ counterWithLabel: "p-4", label: "text-base" }}
          counter={childrenCounters}
          description="Ages 2–12"
          isLoading={false}
          label="Children"
          maxCount={4}
          setCounters={setChildrenCounters}
        />
        <CounterWithLabel
          classes={{ counterWithLabel: "p-4", label: "text-base" }}
          counter={infantsCounters}
          description="Under 2 · Stay for free"
          isLoading={false}
          label="Infants"
          maxCount={5}
          setCounters={setInfantsCounters}
        />
      </SelectWithApplyAndReset>
    </DialogWrapper>
  );
}
