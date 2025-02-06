export interface allBookingsApiDataType {
  endDate: string;
  onlyMyBookings: string;
  propertyId: string;
  startDate: string;
  userId: string;
}

export interface allBookingsApiType {
  data: allBookingsApiDataType;
}

export interface allBookings {
  checkin: string;
  checkout: string;
  guest_name: string;
  id: string;
  owners_booking: string;
  property_title: string;
  status: string;
}

export interface allBookingsType {
  allBookings: allBookings[];
  allBookingsCount: number;
  end_date: string;
  property_id: string;
  start_date: string;
}

export interface allBookingsApiResponseType {
  data: allBookingsType;
}
