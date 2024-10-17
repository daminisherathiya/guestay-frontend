import Image from "next/image";

import CloseIcon from "@mui/icons-material/Close";

import DeleteIcon from "/public/images/delete.svg";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { DialogTitle } from "@/components/atoms/DialogTitle";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { DialogWrapper } from "../DialogWrapper/DialogWrapper";
import { InputFileUpload } from "../InputFileUpload/InputFileUpload";

type UploadPhotosDialogProps = {
  handleCloseUploadPhotosDialog: () => void;
  handleUploadImages: () => void;
  isUploadPhotosDialogOpen: boolean;
  selectedImages: { error?: string; file: File }[];
  setSelectedImages: React.Dispatch<
    React.SetStateAction<{ error?: string; file: File }[]>
  >;
};

const UploadPhotosDialogHeader = ({
  selectedImages,
  handleCloseUploadPhotosDialog,
  setSelectedImages,
}: Pick<
  UploadPhotosDialogProps,
  "selectedImages" | "handleCloseUploadPhotosDialog" | "setSelectedImages"
>) => (
  <Stack
    className="flex-row items-center justify-between px-4 py-3"
    id="scroll-dialog-title"
  >
    <IconButton onClick={handleCloseUploadPhotosDialog}>
      <CloseIcon className="size-5" />
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
);

const ImageGrid = ({
  selectedImages,
  handleDeleteSelectedImage,
}: Pick<UploadPhotosDialogProps, "selectedImages"> & {
  handleDeleteSelectedImage: (index: number) => void;
}) => (
  <Grid2 container spacing={2}>
    {selectedImages.map((imageData, index) => {
      const imageUrl = URL.createObjectURL(imageData.file);
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
            <DeleteIcon className="text-common-white" height={16} width={16} />
          </IconButton>
          {imageData.error && (
            <Stack className="absolute bottom-2 left-2 flex-row items-center gap-1 bg-warning-light px-1.5 py-0.5">
              <Box className="size-2 shrink-0 rounded-full bg-warning-main"></Box>
              <Typography className="text-xs font-bold" variant="body2">
                {imageData.error}
              </Typography>
            </Stack>
          )}
        </Grid2>
      );
    })}
  </Grid2>
);

const EmptyState = ({
  setSelectedImages,
  selectedImages,
}: Pick<UploadPhotosDialogProps, "selectedImages" | "setSelectedImages">) => (
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
);

export function UploadPhotosDialog({
  handleCloseUploadPhotosDialog,
  isUploadPhotosDialogOpen,
  selectedImages,
  setSelectedImages,
  handleUploadImages,
}: UploadPhotosDialogProps) {
  const handleDeleteSelectedImage = (indexToDelete: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete),
    );
  };

  const hasImageErrors = selectedImages.some((image) => !!image.error);
  const noImagesSelected = selectedImages.length === 0;

  return (
    <DialogWrapper
      customHeader={
        <UploadPhotosDialogHeader
          handleCloseUploadPhotosDialog={handleCloseUploadPhotosDialog}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      }
      dialogActions={
        <>
          <Button
            className="text-base no-underline hover:bg-action-hover"
            onClick={handleCloseUploadPhotosDialog}
          >
            Cancel
          </Button>
          <Button
            className="ml-0"
            disabled={noImagesSelected || hasImageErrors}
            size="large"
            variant="contained"
            onClick={handleUploadImages}
          >
            Upload
          </Button>
        </>
      }
      dialogActionsClassName="justify-between border-t border-divider py-4 pr-6"
      handleCloseDialog={handleCloseUploadPhotosDialog}
      isDialogOpen={isUploadPhotosDialogOpen}
      maxWidth="sm"
    >
      {selectedImages.length === 0 ? (
        <EmptyState
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      ) : (
        <ImageGrid
          handleDeleteSelectedImage={handleDeleteSelectedImage}
          selectedImages={selectedImages}
        />
      )}
    </DialogWrapper>
  );
}
