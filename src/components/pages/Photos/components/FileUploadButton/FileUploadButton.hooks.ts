import { ChangeEvent } from "react";

import { useFileUploadButtonProps } from "./FileUploadButton.types";

export const useFileUploadButton = ({
  setSelectedImages,
  selectedImages,
}: useFileUploadButtonProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImages = filesArray.map((file) => ({
        error:
          file.size < 50 * 1024
            ? "Upload a higher quality photo (>50KB)"
            : undefined,
        file,
      }));
      setSelectedImages([...selectedImages, ...newImages]);
    }
    event.target.value = "";
  };
  return { handleFileChange };
};
