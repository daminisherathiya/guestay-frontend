import * as React from "react";

import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";

import DeleteIcon from "/public/images/delete.svg";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/atoms/Dialog";
import { DialogContent } from "@/components/atoms/DialogContent";
import { DialogTitle } from "@/components/atoms/DialogTitle";
import { IconButton } from "@/components/atoms/IconButton";
import { Slide } from "@/components/atoms/Slide";
import { Typography } from "@/components/atoms/Typography";

type ManageListingDialogProps = {
  handleCloseManageListingDialog: () => void;
  isManageListingDialogOpen: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return <Slide ref={ref} direction="up" {...props} />;
});

export default function ManageListingDialog({
  handleCloseManageListingDialog,
  isManageListingDialogOpen,
}: ManageListingDialogProps) {
  return (
    <>
      <Dialog
        classes={{
          paper: "rounded-xl w-full",
        }}
        maxWidth="xs"
        open={isManageListingDialogOpen}
        scroll="paper"
        TransitionComponent={Transition}
        onClose={handleCloseManageListingDialog}
      >
        <DialogTitle
          className="relative h-16 p-0 px-4 py-5 text-center text-base font-bold"
          id="scroll-dialog-title"
        >
          <IconButton className="absolute left-4 top-1/2 -translate-y-1/2">
            <CloseIcon
              className="size-5"
              onClick={handleCloseManageListingDialog}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent className="pb-6">
          <Box className="mx-auto size-36">
            <Image
              alt="Cover picture"
              className="max-h-full max-w-full rounded-lg object-cover"
              height={144}
              src="/images/aa.jpg"
              width={144}
            />
          </Box>
          <Typography
            className="mt-3 text-center font-medium sm:mt-4"
            variant="body2"
          >
            Your House listing
          </Typography>
          <Button
            className="mt-6 w-full sm:mt-10"
            size="large"
            variant="contained"
          >
            Edit listing
          </Button>
          <Button
            className="mt-3 w-full gap-2 no-underline sm:mt-4"
            size="large"
            variant="text"
          >
            <DeleteIcon className="size-5" />
            Remove listing
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
