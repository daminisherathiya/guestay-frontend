export interface propertyApiDataType {
  property_id: string;
  userId: string;
}

export interface propertyApiType {
  data: propertyApiDataType;
}

export interface PropertyType {
  category: string;
  icon: string;
  id: string;
  title: string;
}

export interface propertyApiResponseType {
  data: PropertyType[];
}
