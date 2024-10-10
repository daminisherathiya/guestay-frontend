"use client";

import { useState } from "react";

import Image from "next/image";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Typography } from "@/components/atoms/Typography";
import UploadPhotosDialog from "@/components/molecules/UploadPhotosDialog/UploadPhotosDialog";

export default function Photos() {
  const [isUploadPhotosDialogOpen, setUploadPhotosDialogOpen] = useState(false);

  const handleOpenUploadPhotosDialog = () => {
    setUploadPhotosDialogOpen(true);
  };

  const handleCloseUploadPhotosDialog = () => {
    setUploadPhotosDialogOpen(false);
  };
  return (
    <Container maxWidth="2xl">
      <Box className="mx-auto max-w-2xl">
        <Typography className="mb-2" component="h1" variant="h1">
          Add some photos of your house
        </Typography>
        <Typography
          className="mb-8 text-text-secondary"
          component="h3"
          variant="h3"
        >
          You&apos;ll need 5 photos to get started. You can add more or make
          changes later.
        </Typography>
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
          <UploadPhotosDialog
            handleCloseUploadPhotosDialog={handleCloseUploadPhotosDialog}
            isUploadPhotosDialogOpen={isUploadPhotosDialogOpen}
          />
        </Box>
      </Box>
    </Container>
  );
}
