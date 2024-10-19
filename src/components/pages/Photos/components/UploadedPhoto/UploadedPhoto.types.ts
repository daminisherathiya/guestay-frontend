export interface UploadedPhotoProps {
  handleDeleteImage: (indexToDelete: number) => void;
  handleMakeCoverPhoto: (index: number) => void;
  handleMoveBackwards: (index: number) => void;
  handleMoveForwards: (index: number) => void;
  imageUrl: string;
  index: number;
  totalLength: number;
}
