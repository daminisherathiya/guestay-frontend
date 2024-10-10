import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, DialogContentText } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { IconButton } from "@/components/atoms/IconButton";
import { Typography } from "@/components/atoms/Typography";

type MoreAboutPricingDialogProps = {
  handleCloseMoreAboutPricingDialog: () => void;
  isMoreAboutPricingDialogOpen: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide ref={ref} direction="up" {...props} />;
});

export default function MoreAboutPricingDialog({
  handleCloseMoreAboutPricingDialog,
  isMoreAboutPricingDialogOpen,
}: MoreAboutPricingDialogProps) {
  return (
    <>
      <Dialog
        classes={{
          paper: "rounded-xl w-full",
        }}
        maxWidth="sm"
        open={isMoreAboutPricingDialogOpen}
        scroll="paper"
        TransitionComponent={Transition}
        onClose={handleCloseMoreAboutPricingDialog}
      >
        <DialogTitle
          className="relative p-0 px-4 py-5 text-center text-base font-bold"
          id="scroll-dialog-title"
        >
          <IconButton className="absolute left-4 top-1/2 -translate-y-1/2">
            <CloseIcon
              className="size-5"
              onClick={handleCloseMoreAboutPricingDialog}
            />
          </IconButton>
          More about pricing
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText className="space-y-4">
            <Typography className="text-text-primary" variant="body2">
              You choose your price and you can change it anytime. Bookings
              aren’t guaranteed.
            </Typography>
            <Box>
              <Typography
                className="font-bold text-text-primary"
                variant="body2"
              >
                Per night price
              </Typography>
              <Typography className="mt-2 text-text-primary" variant="body2">
                The suggested price is based on factors like your listing’s
                location and amenities, as well as guest demand and similar
                listings.
              </Typography>
            </Box>
            <Box>
              <Typography
                className="font-bold text-text-primary"
                variant="body2"
              >
                Guest price details
              </Typography>
              <Typography className="mt-2 text-text-primary" variant="body2">
                When you’re setting a price and a price breakdown is shown, the
                guest service fee and/or taxes, if applicable, may vary
                depending on the booked trip details (like the length of stay or
                number of guests).
              </Typography>
            </Box>
            <Box>
              <Typography
                className="font-bold text-text-primary"
                variant="body2"
              >
                Comparing similar listings
              </Typography>
              <Typography className="mt-2 text-text-primary" variant="body2">
                To determine listings that are similar to yours, we consider
                criteria like location, listing type, rooms, amenities, reviews,
                ratings and the listings that guests often view alongside yours.
                We also avoid including listings that aren’t especially active –
                for example, we’ll never include a listing that hasn’t been
                booked in the past year or one that doesn’t have upcoming
                availability. Average per night prices are shown for booked
                and/or available listings. When you choose a range of dates, a
                listing may show on the map as booked and unbooked if it has
                both booked and available nights.
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
