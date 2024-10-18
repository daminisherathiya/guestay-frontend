import { Button } from "@/components/atoms/Button";

import { useInputFileUpload } from "./InputFileUpload.hooks";
import { InputFileUploadProps } from "./InputFileUpload.types";

export function InputFileUpload({
  children,
  className,
  size = "large",
  setSelectedImages,
  selectedImages,
}: InputFileUploadProps) {
  const { handleFileChange } = useInputFileUpload({
    selectedImages,
    setSelectedImages,
  });

  return (
    <>
      <Button
        className={className}
        component="label"
        role={undefined}
        size={size}
        tabIndex={-1}
        variant="contained"
      >
        {children}
        <input
          multiple
          accept=".png,.jpg,.jpeg,.webp"
          className="absolute bottom-0 left-0 size-px overflow-hidden whitespace-nowrap"
          type="file"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
}
