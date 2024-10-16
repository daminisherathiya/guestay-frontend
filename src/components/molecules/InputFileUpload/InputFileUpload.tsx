import React, { ReactElement } from "react";

import { Button } from "@/components/atoms/Button";

interface InputFileUploadProps {
  children: ReactElement;
  className?: string;
  selectedImages: { error?: string; file: File }[];
  setSelectedImages: React.Dispatch<
    React.SetStateAction<{ error?: string; file: File }[]>
  >;
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
      const newImages = filesArray.map((file) => ({
        error: file.size < 50 * 1024 ? "UNDER 50KB" : undefined,
        file,
      }));
      setSelectedImages([...selectedImages, ...newImages]);
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
