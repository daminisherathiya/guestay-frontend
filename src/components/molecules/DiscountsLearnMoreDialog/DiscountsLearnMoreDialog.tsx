import { Button } from "@/components/atoms/Button";
import { Typography } from "@/components/atoms/Typography";
import { DialogWrapper } from "@/components/molecules/DialogWrapper/DialogWrapper";

import { useDiscountsLearnMoreDialog } from "./DiscountsLearnMoreDialog.hooks";
import { DiscountsLearnMoreDialogProps } from "./DiscountsLearnMoreDialog.type";

export function DiscountsLearnMoreDialog({
  classes,
}: DiscountsLearnMoreDialogProps) {
  const {
    discountsLearnMoreDialogIsOpen,
    setDiscountsLearnMoreDialogIsOpenFalse,
    setDiscountsLearnMoreDialogIsOpenTrue,
  } = useDiscountsLearnMoreDialog();

  return (
    <>
      <Button
        disableRipple
        className={`p-0 text-xs ${classes?.button}`}
        variant="text"
        onClick={setDiscountsLearnMoreDialogIsOpenTrue}
      >
        Learn more
      </Button>
      <DialogWrapper
        handleCloseDialog={setDiscountsLearnMoreDialogIsOpenFalse}
        isDialogOpen={discountsLearnMoreDialogIsOpen}
        maxWidth="xs"
        title="Discounts"
      >
        <Typography className="text-text-primary" variant="body2">
          You choose your discount and you can change it at any time.
          <br />
          <br />
          Suggested discounts are based on the average for listings with
          discounts in your area (or the global average if not enough listings
          with discounts are in your area). Weekly discounts are for stays of 7
          nights or more. Monthly discounts are for stays of 28 nights or more.
          <br />
        </Typography>
      </DialogWrapper>
    </>
  );
}
