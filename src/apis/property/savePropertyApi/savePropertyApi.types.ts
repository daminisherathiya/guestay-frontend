/* eslint-disable @typescript-eslint/member-ordering */

export interface SavePropertyApiDataType {
  userId: string;
  propertyId?: string;
  listingStep:
    | "new"
    | "type"
    | "location"
    | "bedroom_info"
    | "amenities"
    | "images"
    | "title"
    | "description"
    | "price"
    | "discount"
    | "draft";
  type?: string;
  location?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  bedroomsInfo?: string;
  noOfCouples?: number;
  noOfChildren?: number;
  numOfPeople?: number;
  bedrooms?: number;
  beds?: number;
  baths?: number;
  cribs?: number;
  amenities?: string;
  images?: File[];
  title?: string;
  description?: string;
  weekdaysPrice?: number;
  discountDays?: number[] | 0;
  discountRate?: number[] | 0;
  discountIds?: string[] | 0;
}

export interface SavePropertyApiType {
  data: SavePropertyApiDataType;
}

export interface SavePropertyAPIResponseType {
  data: {
    recordId: string;
  };
}
