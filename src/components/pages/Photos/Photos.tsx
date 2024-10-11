"use client";

import { useState } from "react";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import DeleteIcon from "/public/images/delete.svg";
import PlusIcon from "/public/images/plus.svg";

import UploadPhotosDialog from "@/components/molecules/UploadPhotosDialog/UploadPhotosDialog";
export default function Photos() {
  const [isUploadPhotosDialogOpen, setUploadPhotosDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleOpenUploadPhotosDialog = () => {
    setUploadPhotosDialogOpen(true);
  };

  const handleCloseUploadPhotosDialog = () => {
    setUploadPhotosDialogOpen(false);
  };

  const handleDeleteImage = (indexToDelete: number) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((_, index) => index != indexToDelete),
    );
  };

  const handleUploadImages = () => {
    setUploadedImages([...uploadedImages, ...selectedImages]);
    setSelectedImages([]);
    handleCloseUploadPhotosDialog();
  };

  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-2xl">
        <Stack className="mb-8 flex-row items-center justify-between">
          {uploadedImages.length === 0 ? (
            <Box>
              <Typography className="mb-2" component="h1" variant="h1">
                Add some photos of your house
              </Typography>

              <Typography
                className="text-text-secondary"
                component="h3"
                variant="h3"
              >
                You&apos;ll need 5 photos to get started. You can add more or
                make changes later.
              </Typography>
            </Box>
          ) : uploadedImages.length < 5 ? (
            <>
              <Typography component="h2" variant="h2">
                Choose at least 5 photos
              </Typography>
            </>
          ) : (
            <>
              <Typography component="h2" variant="h2">
                Ta-da! How does this look?
              </Typography>
            </>
          )}
          {uploadedImages.length > 0 && (
            <Box>
              <IconButton
                className="size-11 bg-action-hover"
                onClick={handleOpenUploadPhotosDialog}
              >
                <PlusIcon className="!size-4" />
              </IconButton>
            </Box>
          )}
        </Stack>

        {uploadedImages && uploadedImages.length > 0 ? (
          <Grid2 container spacing={2}>
            {uploadedImages.map((image, index) => {
              const imageUrl = URL.createObjectURL(image);
              return (
                <Grid2
                  key={index}
                  className="relative rounded-xl bg-action-hover"
                  size={index === 0 ? 12 : 6}
                >
                  <Image
                    alt={`uploaded-${index}`}
                    className={`aspect-square size-full rounded-lg object-cover ${index === 0 ? "max-h-[29.125rem]" : "max-h-56"}`}
                    height={252}
                    src={imageUrl}
                    width={252}
                  />
                  <IconButton
                    className="absolute right-2 top-2 bg-primary-main shadow-button"
                    onClick={() => handleDeleteImage(index)}
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
            <Grid2 size={6}>
              <Button
                className="size-full min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-text-secondary p-10 hover:border-2 hover:border-solid hover:bg-common-white"
                variant="outlined"
                onClick={handleOpenUploadPhotosDialog}
              >
                <PlusIcon className="mx-auto !size-9 text-text-secondary" />
                <Typography
                  className="pt-2 font-medium text-text-secondary"
                  variant="body2"
                >
                  Add more
                </Typography>
              </Button>
            </Grid2>
          </Grid2>
        ) : (
          <Box className="flex h-[60vh] max-h-[31.25rem] flex-col items-center justify-center rounded-xl border border-dashed border-[#B0B0B0] bg-action-hover">
            <Image
              alt="Camera"
              className="mb-3"
              height={182}
              src="/images/camera.jpeg"
              width={182}
            />
            <Button
              className="bg-common-white hover:bg-action-hover"
              variant="outlined"
              onClick={handleOpenUploadPhotosDialog}
            >
              Add photos
            </Button>
          </Box>
        )}
        <UploadPhotosDialog
          handleCloseUploadPhotosDialog={handleCloseUploadPhotosDialog}
          handleUploadImages={handleUploadImages}
          isUploadPhotosDialogOpen={isUploadPhotosDialogOpen}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
        />
      </Box>
    </Container>
  );
}
