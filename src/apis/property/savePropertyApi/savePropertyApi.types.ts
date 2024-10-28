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
  bedroomsInfo?: object;
  noOfCouples?: number;
  noOfChildren?: number;
  numOfPeople?: number;
  bedroom?: number;
  beds?: number;
  baths?: number;
  cribs?: number;
  amenities?: string;
  images?: string[];
  title?: string;
  description?: string;
  weekdaysPrice?: number;
  discountDays?: number[];
  discountRate?: number[];
}

export interface SavePropertyApiType {
  data: SavePropertyApiDataType;
}

export interface SavePropertyAPIResponseType {
  data: {
    recordId: string;
  };
}
