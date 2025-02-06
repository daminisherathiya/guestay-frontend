export interface holidaysApiDataType {
  userId: string;
}

export interface holidaysApiType {
  data: holidaysApiDataType;
}

export interface holidaysType {
  end_at: string;
  id: string;
  name: string;
  start_at: string;
  status: string;
}

export interface holidaysApiResponseType {
  data: holidaysType[];
}
