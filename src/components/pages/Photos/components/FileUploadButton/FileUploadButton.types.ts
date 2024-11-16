import { Dispatch, ReactElement, SetStateAction } from "react";

export interface SelectedImage {
  error?: string;
  file: File;
}

export interface FileUploadButtonProps {
  children: ReactElement;
  className?: string;
  selectedImages: SelectedImage[];
  setSelectedImages: Dispatch<SetStateAction<SelectedImage[]>>;
  size?: "small" | "large" | "medium";
}

export type useFileUploadButtonProps = Pick<
  FileUploadButtonProps,
  "setSelectedImages" | "selectedImages"
>;
