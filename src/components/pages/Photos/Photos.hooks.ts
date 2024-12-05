import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useBoolean } from "@/hooks/useBoolean/useBoolean";
import { useFooterProgressBar } from "@/hooks/useFooterProgressBar";
import { usePropertyToEdit } from "@/hooks/usePropertyToEdit";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { MIN_PHOTOS_REQUIRED } from "./Photos.consts";
import { urlToFile } from "./Photos.utils";

export function usePhotos() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    value: uploadPhotosDialogIsOpen,
    setTrue: setUploadPhotosDialogIsOpenTrue,
    setFalse: setUploadPhotosDialogIsOpenFalse,
  } = useBoolean({ initialValue: false });

  const {
    propertyApiData,
    propertyApiIsFirstLoading,
    propertyApiIsSuccess,
    savePropertyApiIsPending,
    savePropertyApiIsSuccess,
    savePropertyApiMutate,
  } = usePropertyToEdit();

  const [selectedImages, setSelectedImages] = useState<
    { error?: string; file: File }[]
  >([]);

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const imageUrls = useMemo(() => {
    return uploadedImages.map((image) => URL.createObjectURL(image));
  }, [uploadedImages]);

  useEffect(() => {
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const { value: imagesAreLoading, setFalse: setImagesAreLoadingFalse } =
    useBoolean({ initialValue: true });

  useEffect(() => {
    async function loadUploadedImages() {
      if (propertyApiIsSuccess) {
        const imageNames = propertyApiData?.data?.property[0].images
          ? propertyApiData?.data?.property[0].images.split(",")
          : [];

        const imageFiles = await Promise.all(
          imageNames.map(async (imageName) => {
            console.log("🚀 ~ imageNames.map ~ imageName:", imageName);
            const file = await urlToFile(
              // `/_next/image?url=https://guestay.webarysites.com/data/properties_images/${imageName}&w=64&q=75`,
              // `https://guestay.webarysites.com/data/properties_images/${imageName}`,
              `https://guestay.webarysites.com/file/1000/0/1/https%3A%7C%7Cguestay.webarysites.com%7Cdata%7Cproperties_images/${imageName}`,
              imageName,
            );
            console.log("🚀 ~ imageNames.map ~ file:", file);
            return file;
          }),
        );
        setUploadedImages(imageFiles);
        setImagesAreLoadingFalse();
      }
    }
    loadUploadedImages();
  }, [propertyApiData, propertyApiIsSuccess, setImagesAreLoadingFalse]);

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
        propertyId: propertyId,
        userId: getUserDetails().id,
      },
    });
  };

  const isLoading = propertyApiIsFirstLoading || imagesAreLoading;

  const { Footer, nextUrl } = useFooterProgressBar({
    isDisabled: isLoading || uploadedImages.length < MIN_PHOTOS_REQUIRED,
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
    imageUrls,
    isLoading,
    selectedImages,
    setSelectedImages,
    setUploadPhotosDialogIsOpenFalse,
    setUploadPhotosDialogIsOpenTrue,
    uploadedImages,
    uploadPhotosDialogIsOpen,
  };
}
