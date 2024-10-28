export interface locationsApiDataType {
  userId: string;
}

export interface locationsApiType {
  data: locationsApiDataType;
}

export interface LocationType {
  id: string;
  label: string;
}

export interface locationsAPIResponseType {
  data: LocationType[];
}
