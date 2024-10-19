import { ReactElement } from "react";

export interface SelectedImage {
  error?: string;
  file: File;
}

export interface FileUploadButtonProps {
  children: ReactElement;
  className?: string;
  selectedImages: SelectedImage[];
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImage[]>>;
  size?: "small" | "large" | "medium";
}

export type useFileUploadButtonProps = Pick<
  FileUploadButtonProps,
  "setSelectedImages" | "selectedImages"
>;
