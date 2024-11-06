import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBarProps";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import {
  getPropertyIdToEdit,
  getUserDetails,
} from "@/utils/localStorage/localStorage";

import { urlToFile } from "./Photos.utils";

export function usePhotos() {
  const {
    value: uploadPhotosDialogIsOpen,
    setTrue: setUploadPhotosDialogIsOpenTrue,
    setFalse: setUploadPhotosDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    PropertyApiSnackbarAlert,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
    SavePropertyApiSnackbarAlert,
  } = usePropertyToEdit();

  const [selectedImages, setSelectedImages] = useState<
    { error?: string; file: File }[]
  >([]);

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  useEffect(() => {
    async function loadUploadedImages() {
      if (propertyApiIsSuccess) {
        const imageNames =
          propertyApiData?.data?.property[0].images.split(",") || [];

        const imageFiles = await Promise.all(
          imageNames.map((imageName) =>
            urlToFile(
              `https://guestay.webarysites.com/data/properties_images/${imageName}`,
              imageName,
            ),
          ),
        );
        setUploadedImages(imageFiles);
      }
    }
    loadUploadedImages();
  }, [propertyApiData, propertyApiIsSuccess]);

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

  ////////

  const router = useRouter();

  const onSubmit = () => {
    savePropertyApiMutate({
      data: {
        images: uploadedImages,
        listingStep: "images",
        propertyId: getPropertyIdToEdit() as string,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading || !uploadedImages;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading,
    isLoading: savePropertyApiIsPending,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    if (savePropertyApiIsSuccess) {
      router.push(nextUrl);
    }
  }, [nextUrl, router, savePropertyApiIsSuccess]);

  return {
    Footer,
    handleDeleteImage,
    handleMakeCoverPhoto,
    handleMoveBackwards,
    handleMoveForwards,
    handleUploadImages,
    PropertyApiSnackbarAlert,
    SavePropertyApiSnackbarAlert,
    selectedImages,
    setSelectedImages,
    setUploadPhotosDialogIsOpenFalse,
    setUploadPhotosDialogIsOpenTrue,
    uploadedImages,
    uploadPhotosDialogIsOpen,
  };
}
