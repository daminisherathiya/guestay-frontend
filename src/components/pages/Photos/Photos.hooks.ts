import { useCallback, useState } from "react";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";

export function usePhotos() {
  const {
    value: uploadPhotosDialogIsOpen,
    setTrue: setUploadPhotosDialogIsOpenTrue,
    setFalse: setUploadPhotosDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const [selectedImages, setSelectedImages] = useState<
    { error?: string; file: File }[]
  >([]);

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

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
    setUploadPhotosDialogIsOpenFalse();
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
    handleDeleteImage,
    handleMakeCoverPhoto,
    handleMoveBackwards,
    handleMoveForwards,
    handleUploadImages,
    selectedImages,
    setSelectedImages,
    setUploadPhotosDialogIsOpenFalse,
    setUploadPhotosDialogIsOpenTrue,
    uploadedImages,
    uploadPhotosDialogIsOpen,
  };
}
