import { ReactElement } from "react";

export interface SelectedImage {
  error?: string;
  file: File;
}

export interface InputFileUploadProps {
  children: ReactElement;
  className?: string;
  selectedImages: SelectedImage[];
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImage[]>>;
  size?: "small" | "large" | "medium";
}

export type useInputFileUploadProps = Pick<
  InputFileUploadProps,
  "setSelectedImages" | "selectedImages"
>;
