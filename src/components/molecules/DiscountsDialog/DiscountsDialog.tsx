import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { DialogContentText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { IconButton } from "@/components/atoms/IconButton";
import { Typography } from "@/components/atoms/Typography";

type DiscountsDialogProps = {
  handleCloseDiscountsDialog: () => void;
  isDiscountsDialogOpen: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide ref={ref} direction="up" {...props} />;
});

export default function DiscountsDialog({
  handleCloseDiscountsDialog,
  isDiscountsDialogOpen,
}: DiscountsDialogProps) {
  return (
    <>
      <Dialog
        classes={{
          paper: "rounded-xl w-full",
        }}
        maxWidth="xs"
        open={isDiscountsDialogOpen}
        scroll="paper"
        TransitionComponent={Transition}
        onClose={handleCloseDiscountsDialog}
      >
        <DialogTitle
          className="relative p-0 px-4 py-5 text-center text-base font-bold"
          id="scroll-dialog-title"
        >
          <IconButton className="absolute left-4 top-1/2 -translate-y-1/2">
            <CloseIcon
              className="size-5"
              onClick={handleCloseDiscountsDialog}
            />
          </IconButton>
          Discounts
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <Typography className="text-text-primary" variant="body2">
              You choose your discount and you can change it at any time.
              <br />
              <br />
              Suggested discounts are based on the average for listings with
              discounts in your area (or the global average if not enough
              listings with discounts are in your area). Weekly discounts are
              for stays of 7 nights or more. Monthly discounts are for stays of
              28 nights or more.
              <br />
              <br />
              Visit the Discounts section of our Help Centre to learn more.
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
