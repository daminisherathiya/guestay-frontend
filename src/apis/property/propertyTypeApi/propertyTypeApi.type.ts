export interface propertyTypeApiDataType {
  userId: string;
}

export interface propertyTypeApiType {
  data: propertyTypeApiDataType;
}

export interface PropertyType {
  icon: string;
  id: string;
  title: string;
}

export interface propertyTypeApiResponseType {
  data: PropertyType[];
}
