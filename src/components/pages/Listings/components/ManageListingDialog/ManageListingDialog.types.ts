import { ListingPropertiesType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";

export interface ManageListingDialogProps {
  handleCloseManageListingDialog: () => void;
  manageListingDialogIsOpen: boolean;
  selectedListing: ListingPropertiesType | null;
}
