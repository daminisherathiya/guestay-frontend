import * as React from "react";

import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Divider, Link } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { Box } from "@/components/atoms/Box";
import { Dialog } from "@/components/atoms/Dialog";
import { DialogContent } from "@/components/atoms/DialogContent";
import { DialogTitle } from "@/components/atoms/DialogTitle";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Slide } from "@/components/atoms/Slide";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

type FullReceiptPreviewDialogProps = {
  handleCloseFullReceiptPreviewDialog: () => void;
  isFullReceiptPreviewDialogOpen: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return <Slide ref={ref} direction="up" {...props} />;
});

export default function FullReceiptPreviewDialog({
  handleCloseFullReceiptPreviewDialog,
  isFullReceiptPreviewDialogOpen,
}: FullReceiptPreviewDialogProps) {
  return (
    <>
      <Dialog
        classes={{
          paper: "rounded-xl w-full",
        }}
        maxWidth="lg"
        open={isFullReceiptPreviewDialogOpen}
        scroll="paper"
        TransitionComponent={Transition}
        onClose={handleCloseFullReceiptPreviewDialog}
      >
        <DialogTitle
          className="relative p-0 px-4 py-5 text-center text-base font-bold"
          id="scroll-dialog-title"
        >
          <IconButton className="absolute left-4 top-1/2 -translate-y-1/2">
            <CloseIcon
              className="size-5"
              onClick={handleCloseFullReceiptPreviewDialog}
            />
          </IconButton>
          Full preview
        </DialogTitle>
        <DialogContent dividers>
          <Box className="sm:px-3 sm:py-5 lg:px-6 lg:py-8">
            {/* eslint-disable-next-line sort-keys */}
            <Grid2 container spacing={{ "2xs": 4, sm: 5, md: 6 }}>
              {/* eslint-disable-next-line sort-keys */}
              <Grid2 className="mx-auto" size={{ "2xs": 12, sm: 10, md: 6 }}>
                <Box className="sticky top-0 ">
                  <Image
                    alt="Cover picture"
                    className="max-h-96 w-full rounded-lg object-cover"
                    height={320}
                    src="/images/aa.jpg"
                    width={320}
                  />
                </Box>
              </Grid2>
              {/* eslint-disable-next-line sort-keys */}
              <Grid2 size={{ "2xs": 12, md: 6 }}>
                <Box>
                  <Typography component="h1" variant="h1">
                    The Orchard House
                  </Typography>
                  <Stack className="justify-between gap-9 py-5 xs:flex-row lg:py-6 xl:py-8">
                    <Box className="order-2 xs:order-1">
                      <Typography component="h2" variant="h2">
                        Entire home hosted by Damini
                      </Typography>
                      <Typography className="mt-2">
                        4 guests · 6 bedrooms · 6 beds · 3.5 bathrooms
                      </Typography>
                    </Box>
                    <Box className="order-1 xs:order-2">
                      <Avatar className="size-14 bg-primary-dark font-medium">
                        D
                      </Avatar>
                    </Box>
                  </Stack>
                  <Divider />
                  <Box className="py-5 lg:py-6 xl:py-8">
                    <Typography>
                      You&apos;ll have a great time at this comfortable place to
                      stay.
                    </Typography>
                  </Box>
                  <Divider />
                  <Box className="py-5 lg:py-6 xl:py-8">
                    <Typography
                      className="font-medium"
                      component="h2"
                      variant="body1"
                    >
                      Location
                    </Typography>
                    <Typography className="mt-5" component="h3" variant="body1">
                      153 California Ave, Palo Alto, CA 94306, USA
                    </Typography>
                    <Typography className="mt-1 text-xs">
                      We&apos;ll only share your address with guests who are
                      booked as outlined in our{" "}
                      <Link href="#">Privacy Policy</Link>
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
