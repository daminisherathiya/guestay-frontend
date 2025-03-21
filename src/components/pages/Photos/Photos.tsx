"use client";

import Image from "next/image";

import ErrorIcon from "@mui/icons-material/Error";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Grid2 } from "@/components/atoms/Grid2";
import { IconButton } from "@/components/atoms/IconButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import PlusIcon from "/public/images/plus.svg";

import { UploadedPhoto } from "./components/UploadedPhoto";
import { UploadPhotosDialog } from "./components/UploadPhotosDialog";
import { MIN_PHOTOS_REQUIRED } from "./Photos.consts";
import { usePhotos } from "./Photos.hooks";

export function Photos() {
  const {
    Footer,
    handleDeleteImage,
    handleMakeCoverPhoto,
    handleMoveBackwards,
    handleMoveForwards,
    handleUploadImages,
    isLoading,
    imageUrls,
    selectedImages,
    setSelectedImages,
    setUploadPhotosDialogIsOpenFalse,
    setUploadPhotosDialogIsOpenTrue,
    uploadedImages,
    uploadPhotosDialogIsOpen,
  } = usePhotos();

  return (
    <>
      <Container maxWidth="2xl">
        <Box className="mx-auto max-w-2xl">
          {isLoading ? (
            <Stack className="mb-8 flex-row items-center justify-between gap-4">
              <Box className="grow">
                <Skeleton className="w-full text-2xl" variant="text" />
                <Skeleton className="w-2/3 text-2xl" variant="text" />
              </Box>
              <Skeleton className="size-11" variant="circular" />
            </Stack>
          ) : (
            <Stack className="mb-8 flex-row items-center justify-between gap-2">
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
                    You&apos;ll need {MIN_PHOTOS_REQUIRED} photos to get
                    started. You can add more or make changes later.
                  </Typography>
                </Box>
              ) : uploadedImages.length < MIN_PHOTOS_REQUIRED ? (
                <>
                  <Typography component="h2" variant="h2">
                    Choose at least {MIN_PHOTOS_REQUIRED} photos
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
                    onClick={setUploadPhotosDialogIsOpenTrue}
                  >
                    <PlusIcon className="!size-4" />
                  </IconButton>
                </Box>
              )}
            </Stack>
          )}

          {isLoading ? (
            <Skeleton
              className="h-[60vh] max-h-[31.25rem] w-full rounded-lg"
              variant="rectangular"
            />
          ) : uploadedImages && uploadedImages.length > 0 ? (
            <Grid2 container spacing={2}>
              {uploadedImages.map((image, index) => {
                const imageUrl = imageUrls[index];

                return (
                  <Grid2
                    key={index}
                    className="relative rounded-xl bg-action-hover"
                    size={{
                      "2xs": 12,
                      sm: index === 0 ? 12 : 6,
                    }}
                  >
                    <UploadedPhoto
                      handleDeleteImage={handleDeleteImage}
                      handleMakeCoverPhoto={handleMakeCoverPhoto}
                      handleMoveBackwards={handleMoveBackwards}
                      handleMoveForwards={handleMoveForwards}
                      imageUrl={imageUrl}
                      index={index}
                      totalLength={uploadedImages.length - 1}
                    />
                  </Grid2>
                );
              })}
              {uploadedImages.length < MIN_PHOTOS_REQUIRED &&
                [...Array(MIN_PHOTOS_REQUIRED - uploadedImages.length)].map(
                  (_, index) => (
                    <Grid2 key={index} size={{ "2xs": 12, sm: 6 }}>
                      <Button
                        className="size-full min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-text-secondary p-10 hover:border-2 hover:border-solid hover:bg-common-white"
                        variant="outlined"
                        onClick={setUploadPhotosDialogIsOpenTrue}
                      >
                        <ImageOutlinedIcon className="mx-auto !size-10 text-text-secondary" />
                      </Button>
                    </Grid2>
                  ),
                )}
              <Grid2 size={{ "2xs": 12, sm: 6 }}>
                <Button
                  className="size-full min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-text-secondary p-10 hover:border-2 hover:border-solid hover:bg-common-white"
                  variant="outlined"
                  onClick={setUploadPhotosDialogIsOpenTrue}
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
              {MIN_PHOTOS_REQUIRED - uploadedImages.length > 0 && (
                <Grid2 size={12}>
                  <Stack className="mb-6 flex-row items-center gap-2">
                    <ErrorIcon className="size-5 text-error-main" />
                    <Typography
                      className="font-bold text-error-main"
                      variant="body2"
                    >
                      Please add {MIN_PHOTOS_REQUIRED - uploadedImages.length}{" "}
                      more photo
                      {MIN_PHOTOS_REQUIRED - uploadedImages.length === 1
                        ? ""
                        : "s"}
                    </Typography>
                  </Stack>
                </Grid2>
              )}
            </Grid2>
          ) : (
            <Box className="flex h-[60vh] max-h-[31.25rem] flex-col items-center justify-center rounded-xl border border-dashed border-divider bg-action-hover">
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
                onClick={setUploadPhotosDialogIsOpenTrue}
              >
                Add photos
              </Button>
            </Box>
          )}
          <UploadPhotosDialog
            handleCloseUploadPhotosDialog={setUploadPhotosDialogIsOpenFalse}
            handleUploadImages={handleUploadImages}
            isUploadPhotosDialogOpen={uploadPhotosDialogIsOpen}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        </Box>
      </Container>
      {Footer}
    </>
  );
}
