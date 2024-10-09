import * as React from "react";

import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { Box } from "@/components/atoms/Box";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import InputFileUpload from "../InputFileUpload/InputFileUpload";

type UploadPhotosDialogProps = {
  handleCloseUploadPhotosDialog: () => void;
  isUploadPhotosDialogOpen: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide ref={ref} direction="up" {...props} />;
});

export default function UploadPhotosDialog({
  handleCloseUploadPhotosDialog,
  isUploadPhotosDialogOpen,
}: UploadPhotosDialogProps) {
  return (
    <>
      <Dialog
        classes={{
          paper: "rounded-xl w-full",
        }}
        open={isUploadPhotosDialogOpen}
        scroll="paper"
        TransitionComponent={Transition}
        onClose={handleCloseUploadPhotosDialog}
      >
        <Stack
          className="flex-row items-center justify-between px-4 py-3"
          id="scroll-dialog-title"
        >
          <IconButton>
            <CloseIcon
              className="size-5"
              onClick={handleCloseUploadPhotosDialog}
            />
          </IconButton>
          <Box className="text-center">
            <DialogTitle className="p-0 text-base font-bold">
              Upload photos
            </DialogTitle>
            <Typography className="text-xs text-text-secondary">
              No items selected
            </Typography>
          </Box>
          <InputFileUpload
            className="size-9 min-w-0 rounded-full bg-common-transparent p-2 hover:bg-action-hover hover:shadow-none"
            size="small"
          >
            <Image
              alt="plus"
              className="text-secondary-main"
              height={16}
              src="/images/plus.svg"
              width={16}
            />
          </InputFileUpload>
        </Stack>
        <DialogContent>
          <Box className="space-y-4 rounded-lg border border-dashed p-8">
            <Image
              alt="images"
              className="mx-auto"
              height={64}
              src="/images/photoLibrary.svg"
              width={64}
            />
            <Typography className="text-center text-xl font-medium">
              Drag and drop
            </Typography>
            <Typography className="text-center text-xs">
              or browse for photos
            </Typography>
            <Box className="text-center">
              <InputFileUpload>
                <Typography className="font-medium">Browse</Typography>
              </InputFileUpload>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="justify-between border-t border-divider py-4 pr-6">
          <Button
            className="text-base no-underline hover:bg-action-hover"
            onClick={handleCloseUploadPhotosDialog}
          >
            Cancel
          </Button>
          <Button
            className="ml-0"
            color="secondary"
            size="large"
            variant="contained"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
