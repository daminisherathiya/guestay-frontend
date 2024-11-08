import { useFileUploadButtonProps } from "./FileUploadButton.types";

export const useFileUploadButton = ({
  setSelectedImages,
  selectedImages,
}: useFileUploadButtonProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImages = filesArray.map((file) => ({
        error:
          file.size < 50 * 1024 ? "Upload a higher quality photo" : undefined,
        file,
      }));
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };
  return { handleFileChange };
};
