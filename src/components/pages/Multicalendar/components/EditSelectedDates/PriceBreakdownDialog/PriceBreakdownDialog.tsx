import { Button } from "@mui/material";

import { Divider } from "@/components/atoms/Divider";
import { Stack } from "@/components/atoms/Stack";
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
    adultsCount,
    childrenCount,
    handleResetGuestCount,
    handleResetPetsCount,
    infantsCount,
    onCloseGuestCountSelect,
    onClosePetsCountSelect,
    onSaveGuestCountSelect,
    onSavePetsCountSelect,
    petsCount,
    setAdultsCount,
    setChildrenCount,
    setInfantsCount,
    setpetsCount,
    showGuestResetButton,
    showPetsResetButton,
  } = usePriceBreakdownDialog();

  return (
    <DialogWrapper
      dialogActions={
        <>
          <Button size="large" variant="contained">
            Close
          </Button>
        </>
      }
      dialogActionsClassName="py-4"
      handleCloseDialog={setPriceBreakdownDialogIsOpenFalse}
      isDialogOpen={priceBreakdownDialogIsOpen}
      maxWidth="sm"
      title="2 nights · 19–20 Dec"
    >
      <Typography className="mb-2 text-3xl" variant="h1">
        Price breakdown
      </Typography>
      <Typography className="mb-6 text-text-secondary">
        Adjust guests and pets and we’ll show you the final price.
      </Typography>
      <Stack className="mb-5 flex-row justify-center gap-2">
        <SelectWithApplyAndReset
          handleReset={handleResetGuestCount}
          labelForCount="guest"
          showResetButton={showGuestResetButton}
          onCloseSelectHandler={onCloseGuestCountSelect}
          onSaveSelectHandler={onSaveGuestCountSelect}
        >
          <CounterWithLabel
            classes={{ counterWithLabel: "p-4", label: "text-base" }}
            counter={adultsCount}
            description="Ages 13 or above"
            isLoading={false}
            label="Adults"
            maxCount={4}
            minCount={1}
            setCounters={setAdultsCount}
          />
          <CounterWithLabel
            classes={{ counterWithLabel: "p-4", label: "text-base" }}
            counter={childrenCount}
            description="Ages 2–12"
            isLoading={false}
            label="Children"
            maxCount={4}
            setCounters={setChildrenCount}
          />
          <CounterWithLabel
            classes={{ counterWithLabel: "p-4", label: "text-base" }}
            counter={infantsCount}
            description="Under 2 · Stay for free"
            isLoading={false}
            label="Infants"
            maxCount={5}
            setCounters={setInfantsCount}
          />
        </SelectWithApplyAndReset>
        <SelectWithApplyAndReset
          handleReset={handleResetPetsCount}
          labelForCount="pet"
          showResetButton={showPetsResetButton}
          onCloseSelectHandler={onClosePetsCountSelect}
          onSaveSelectHandler={onSavePetsCountSelect}
        >
          <CounterWithLabel
            classes={{ counterWithLabel: "p-4", label: "text-base" }}
            counter={petsCount}
            isLoading={false}
            label="Adults"
            maxCount={5}
            setCounters={setpetsCount}
          />
        </SelectWithApplyAndReset>
      </Stack>
      <Stack className="flex-row justify-between gap-4 py-3">
        <Stack className="gap-1">
          <Typography>₹921 x 1 night</Typography>
          <Typography className="text-text-secondary" variant="body2">
            Your base price
          </Typography>
        </Stack>
        <Typography>₹921</Typography>
      </Stack>
      <Stack className="flex-row justify-between gap-4 py-3">
        <Typography>Guest service fee</Typography>
        <Typography>₹130</Typography>
      </Stack>
      <Divider className="my-3" />
      <Stack className="flex-row justify-between gap-4 py-3">
        <Typography className="font-medium">
          Guest price before taxes
        </Typography>
        <Typography className="font-medium">₹1,051</Typography>
      </Stack>
      <Stack className="flex-row justify-between gap-4 py-3">
        <Typography>Taxes</Typography>
        <Typography>₹111</Typography>
      </Stack>
      <Divider className="my-3" />
      <Stack className="flex-row justify-between gap-4 py-3">
        <Typography className="font-medium">Guest total</Typography>
        <Typography className="font-medium">₹1,162</Typography>
      </Stack>
      <Typography className="mt-6 text-center">You earn ₹893</Typography>
    </DialogWrapper>
  );
}
