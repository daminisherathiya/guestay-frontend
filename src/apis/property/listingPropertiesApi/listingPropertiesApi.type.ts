export interface listingPropertiesApiDataType {
  userId: string;
}

export interface listingPropertiesApiType {
  data: listingPropertiesApiDataType;
}

export interface ListingPropertiesType {
  id: string;
  listing_steps: string;
  title: string;
}

export interface listingPropertiesApiResponseType {
  data: ListingPropertiesType[];
}
