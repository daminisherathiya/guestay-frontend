import { Button } from "@/components/atoms/Button";

import { useFileUploadButton } from "./FileUploadButton.hooks";
import { FileUploadButtonProps } from "./FileUploadButton.types";

export function FileUploadButton({
  children,
  className,
  size = "large",
  setSelectedImages,
  selectedImages,
}: FileUploadButtonProps) {
  const { handleFileChange } = useFileUploadButton({
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
          accept=".png,.jpg,.jpeg"
          className="absolute bottom-0 left-0 size-px overflow-hidden whitespace-nowrap"
          type="file"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
}
