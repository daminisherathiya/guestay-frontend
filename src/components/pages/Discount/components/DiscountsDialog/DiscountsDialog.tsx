import { Typography } from "@/components/atoms/Typography";
import { DialogWrapper } from "@/components/molecules/DialogWrapper/DialogWrapper";

import { DiscountsDialogProps } from "./DiscountsDialog.types";

export function DiscountsDialog({
  handleCloseDiscountsDialog,
  discountsDialogIsOpen,
}: DiscountsDialogProps) {
  return (
    <DialogWrapper
      handleCloseDialog={handleCloseDiscountsDialog}
      isDialogOpen={discountsDialogIsOpen}
      maxWidth="xs"
      title="Discounts"
    >
      <Typography className="text-text-primary" variant="body2">
        You choose your discount and you can change it at any time.
        <br />
        <br />
        Suggested discounts are based on the average for listings with discounts
        in your area (or the global average if not enough listings with
        discounts are in your area). Weekly discounts are for stays of 7 nights
        or more. Monthly discounts are for stays of 28 nights or more.
        <br />
        <br />
        Visit the Discounts section of our Help Centre to learn more.
      </Typography>
    </DialogWrapper>
  );
}
