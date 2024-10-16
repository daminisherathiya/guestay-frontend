import React from "react";

import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/atoms/Dialog";
import { DialogActions } from "@/components/atoms/DialogActions";
import { DialogContent } from "@/components/atoms/DialogContent";
import { DialogTitle } from "@/components/atoms/DialogTitle";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Slide } from "@/components/atoms/Slide";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import DeleteIcon from "/public/images/delete.svg";

import InputFileUpload from "../InputFileUpload/InputFileUpload";

type UploadPhotosDialogProps = {
  handleCloseUploadPhotosDialog: () => void;
  handleUploadImages: () => void;
  isUploadPhotosDialogOpen: boolean;
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return <Slide ref={ref} direction="up" {...props} />;
});

export function UploadPhotosDialog({
  handleCloseUploadPhotosDialog,
  isUploadPhotosDialogOpen,
  selectedImages,
  setSelectedImages,
  handleUploadImages,
}: UploadPhotosDialogProps) {
  const handleDeleteSelectedImage = (indexToDelete: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index != indexToDelete),
    );
  };
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
            {selectedImages.length > 0 ? (
              <Typography className="text-xs text-text-secondary">
                {selectedImages.length} item{selectedImages.length > 1 && "s"}{" "}
                selected
              </Typography>
            ) : (
              <Typography className="text-xs text-text-secondary">
                No items selected
              </Typography>
            )}
          </Box>
          <InputFileUpload
            className="size-9 min-w-0 rounded-full bg-common-transparent p-2 hover:bg-action-hover hover:shadow-none"
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            size="small"
          >
            <Image alt="plus" height={16} src="/images/plus.svg" width={16} />
          </InputFileUpload>
        </Stack>
        <DialogContent>
          {selectedImages.length === 0 ? (
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
                <InputFileUpload
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                >
                  <Typography className="font-medium">Browse</Typography>
                </InputFileUpload>
              </Box>
            </Box>
          ) : (
            <Grid2 container spacing={2}>
              {selectedImages.map((image, index) => {
                const imageUrl = URL.createObjectURL(image);
                return (
                  <Grid2
                    key={index}
                    className="relative rounded-xl bg-action-hover"
                    size={6}
                  >
                    <Image
                      alt={`uploaded-${index}`}
                      className="aspect-square rounded-lg object-cover"
                      height={252}
                      src={imageUrl}
                      width={252}
                    />
                    <IconButton
                      className="absolute right-2 top-2 bg-primary-main shadow-button"
                      onClick={() => handleDeleteSelectedImage(index)}
                    >
                      <DeleteIcon
                        className="text-common-white"
                        height={16}
                        width={16}
                      />
                    </IconButton>
                  </Grid2>
                );
              })}
            </Grid2>
          )}
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
            size="large"
            variant="contained"
            onClick={handleUploadImages}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
