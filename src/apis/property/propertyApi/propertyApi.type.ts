export interface propertyApiDataType {
  propertyId: string;
  userId: string;
}

export interface propertyApiType {
  data: propertyApiDataType;
}

export interface PropertyType {
  amenities: string;
  id: string;
  title: string;
  type: string;
}

export interface propertyApiResponseType {
  data: PropertyType[];
}
