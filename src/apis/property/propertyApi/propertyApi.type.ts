export interface propertyApiDataType {
  propertyId: string;
  userId: string;
}

export interface propertyApiType {
  data: propertyApiDataType;
}

export interface PropertyType {
  amenities: string;
  description: string;
  discount_rate: Array<number>;
  id: string;
  images: string;
  title: string;
  type: string;
  weekdays_price: string;
}

export interface propertyApiResponseType {
  data: PropertyType[];
}
