export interface saveBlockOutDatesApiDataType {
  endDate: string[];
  id: string[];
  note: string[];
  propertyId: string[];
  startDate: string[];
  type: ("checkin" | "checkout")[];
  userId: string;
}

export interface saveBlockOutDatesApiType {
  data: saveBlockOutDatesApiDataType;
}

export interface saveBlockOutDatesApiResponseType {
  data: [];
}
