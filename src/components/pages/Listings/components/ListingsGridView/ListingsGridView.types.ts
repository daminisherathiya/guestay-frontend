import {
  ListingPropertiesType,
  listingPropertiesApiResponseType,
} from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";
import { locationsAPIResponseType } from "@/apis/property/locationsApi/locationsApi.types";

export interface ListingsGridViewProps {
  handleOpenManageListingDialog: (
    listingPropertieData: ListingPropertiesType,
  ) => void;
  isLoading: boolean;
  listingPropertiesApiData: listingPropertiesApiResponseType | undefined;
  locationsApiData: locationsAPIResponseType | undefined;
}
