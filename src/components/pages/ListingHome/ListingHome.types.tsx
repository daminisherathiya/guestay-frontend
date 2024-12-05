import { ListingPropertiesType } from "@/apis/property/listingPropertiesApi/listingPropertiesApi.types";

export interface findFirstMissingListingStepType {
  providedListingSteps: string;
}

export interface getNextListingStepUrlType {
  propertyIdToEdit: string;
  providedListingSteps: string;
}

export interface ListingPropertyTypeExtended extends ListingPropertiesType {
  nextListingStepUrl: string;
}

export interface getListingPropertiesListType {
  listingProperties: ListingPropertyTypeExtended[];
  showMore: boolean;
}
