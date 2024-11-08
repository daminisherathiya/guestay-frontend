export interface locationsApiDataType {
  userId: string;
}

export interface locationsApiType {
  data: locationsApiDataType;
}

export interface LocationType {
  id: string;
  label: string;
  latitude: string;
  location_ids: string[];
  longitude: string;
  parent: string;
}

export interface locationsAPIResponseType {
  data: LocationType[];
}
