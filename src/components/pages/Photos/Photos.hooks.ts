import { useCallback, useState } from "react";

export function usePhotos() {
  const [isUploadPhotosDialogOpen, setUploadPhotosDialogOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    { error?: string; file: File }[]
  >([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleOpenUploadPhotosDialog = () => {
    setUploadPhotosDialogOpen(true);
  };

  const handleCloseUploadPhotosDialog = () => {
    setUploadPhotosDialogOpen(false);
  };

  const handleDeleteImage = useCallback((indexToDelete: number) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((_, index) => index != indexToDelete),
    );
  }, []);

  const handleMakeCoverPhoto = useCallback(
    (index: number) => {
      const newImages = [...uploadedImages];
      [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
      setUploadedImages(newImages);
    },
    [uploadedImages],
  );

  const handleMoveBackwards = useCallback(
    (index: number) => {
      const newImages = [...uploadedImages];
      [newImages[index - 1], newImages[index]] = [
        newImages[index],
        newImages[index - 1],
      ];
      setUploadedImages(newImages);
    },
    [uploadedImages],
  );

  const handleMoveForwards = useCallback(
    (index: number) => {
      const newImages = [...uploadedImages];
      [newImages[index + 1], newImages[index]] = [
        newImages[index],
        newImages[index + 1],
      ];
      setUploadedImages(newImages);
    },
    [uploadedImages],
  );

  const handleUploadImages = () => {
    setUploadedImages([
      ...uploadedImages,
      ...selectedImages.map((image) => image.file),
    ]);
    setSelectedImages([]);
    handleCloseUploadPhotosDialog();
  };

  // const imageUrls = useMemo(() => {
  //   return uploadedImages.map((image) => URL.createObjectURL(image));
  // }, [uploadedImages]);

  // // Cleanup object URLs to prevent memory leaks
  // useEffect(() => {
  //   return () => {
  //     imageUrls.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [imageUrls]);

  return {
    handleCloseUploadPhotosDialog,
    handleDeleteImage,
    handleMakeCoverPhoto,
    handleMoveBackwards,
    handleMoveForwards,
    handleOpenUploadPhotosDialog,
    handleUploadImages,
    isUploadPhotosDialogOpen,
    selectedImages,
    setSelectedImages,
    uploadedImages,
  };
}
