export interface propertyApiDataType {
  propertyId: string;
  userId: string;
}

export interface propertyApiType {
  data: propertyApiDataType;
}

export interface PropertyType {
  address: string;
  amenities: string;
  baths: string;
  bedrooms: string;
  bedrooms_info: string;
  beds: string;
  cribs: string;
  description: string;
  discount_rate: Array<number>;
  id: string;
  images: string;
  latitude: string;
  location: string;
  longitude: string;
  no_of_couples: string;
  num_of_people: string;
  title: string;
  type: string;
  weekdays_price: string;
}

export interface propertyApiResponseType {
  data: {
    discount: string | { discount_days: string; discount_rate: string }[];
    property: PropertyType[];
  };
}
