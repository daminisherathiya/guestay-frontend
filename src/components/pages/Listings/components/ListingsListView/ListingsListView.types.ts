import { listingPropertiesApiResponseType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { locationsAPIResponseType } from "@/apis/property/locationsApi/locationsApi.types";

export interface ListingsListViewProps {
  handleOpenManageListingDialog: () => void;
  isLoading: boolean;
  listingPropertiesApiData: listingPropertiesApiResponseType | undefined;
  locationsApiData: locationsAPIResponseType | undefined;
}
