export interface locationsApiDataType {
  userId: string;
}

export interface locationsApiType {
  data: locationsApiDataType;
}

export interface LocationType {
  id: string;
  label: string;
  location_ids: string[];
  parent: string;
}

export interface locationsAPIResponseType {
  data: LocationType[];
}
