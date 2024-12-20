export interface listingPropertiesApiDataType {
  status: string;
  userId: string;
}

export interface listingPropertiesApiType {
  data: listingPropertiesApiDataType;
}

export interface ListingPropertiesType {
  created_at: string;
  id: string;
  images: string;
  listing_steps: string | null;
  location: string;
  status: "active" | "inactive" | "trash" | "draft";
  title: string;
}

export interface listingPropertiesApiResponseType {
  data: ListingPropertiesType[];
}
