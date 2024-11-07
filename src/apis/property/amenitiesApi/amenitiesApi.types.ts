export interface amenitiesApiDataType {
  userId: string;
}

export interface amenitiesApiType {
  data: amenitiesApiDataType;
}

export interface AmeinityType {
  category: string;
  icon: string;
  id: string;
  title: string;
}

export interface amenitiesAPIResponseType {
  data: AmeinityType[];
}
