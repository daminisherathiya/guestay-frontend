import React, { ReactElement } from "react";

import Button from "@mui/material/Button";

interface InputFileUploadProps {
  children: ReactElement;
  className?: string;
  selectedImages: File[];
  setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
  size?: "small" | "large" | "medium";
}

export default function InputFileUpload({
  children,
  className,
  size = "large",
  setSelectedImages,
  selectedImages,
}: InputFileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages([...selectedImages, ...filesArray]);
    }
  };

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
