export interface getBlockOutDatesApiDataType {
  endDate: string;
  propertyId: string;
  startDate: string;
  userId: string;
}

export interface getBlockOutDatesApiType {
  data: getBlockOutDatesApiDataType;
}

export interface getBlockOutDatesType {
  end_date: string;
  id: string;
  note: string;
  start_date: string;
  type: "checkin" | "checkout";
}

export interface getBlockOutDatesApiResponseType {
  data: getBlockOutDatesType[];
}
