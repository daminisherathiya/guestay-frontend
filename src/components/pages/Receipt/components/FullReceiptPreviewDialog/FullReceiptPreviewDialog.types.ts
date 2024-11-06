import { PropertyType } from "@/apis/property/propertyApi/propertyApi.type";

export interface FullReceiptPreviewDialogProps {
  coverImage: string;
  handleCloseFullReceiptPreviewDialog: () => void;
  isFullReceiptPreviewDialogOpen: boolean;
  property: PropertyType | null;
  propertyApiIsSuccess: boolean;
}

export interface useFullReceiptPreviewDialogProps {
  property: PropertyType | null;
  propertyApiIsSuccess: boolean;
}
