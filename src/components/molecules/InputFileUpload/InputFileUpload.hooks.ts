import { useInputFileUploadProps } from "./InputFileUpload.types";

export const useInputFileUpload = ({
  setSelectedImages,
  selectedImages,
}: useInputFileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImages = filesArray.map((file) => ({
        error: file.size < 50 * 1024 ? "UNDER 50KB" : undefined,
        file,
      }));
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };
  return { handleFileChange };
};
