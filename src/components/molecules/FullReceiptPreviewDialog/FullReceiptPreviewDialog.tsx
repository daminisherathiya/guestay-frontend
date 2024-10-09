import * as React from "react";

import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import { Avatar, DialogContentText, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { Box } from "@/components/atoms/Box";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

type FullReceiptPreviewDialogProps = {
  handleCloseFullReceiptPreviewDialog: () => void;
  isFullReceiptPreviewDialogOpen: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
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
        open={true}
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
          <Box className="px-6 py-8">
            <Grid2 container spacing={6}>
              <Grid2 size={6}>
                <Box>
                  <Image
                    alt="Cover picture"
                    className="max-h-80 w-full rounded-lg object-cover"
                    height={320}
                    src="/images/aa.jpg"
                    width={320}
                  />
                </Box>
              </Grid2>
              <Grid2 size={6}>
                <Typography component="h1" variant="h1">
                  The Orchard House
                </Typography>
                <Stack className="flex-row justify-between gap-9 py-8">
                  <Box>
                    <Typography component="h2" variant="h2">
                      Entire home hosted by Damini
                    </Typography>
                    <Typography className="mt-2">
                      4 guests · 6 bedrooms · 6 beds · 3.5 bathrooms
                    </Typography>
                  </Box>
                  <Box>
                    <Avatar className="size-14 bg-primary-dark font-medium">
                      D
                    </Avatar>
                  </Box>
                </Stack>
                <Divider />
                <Box className="py-8">
                  <Typography>
                    You&apos;ll have a great time at this comfortable place to
                    stay.
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
