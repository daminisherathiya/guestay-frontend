export interface propertyPricingInfoApiDataType {
  propertyId: string;
  userId: string;
}

export interface propertyPricingInfoApiType {
  data: propertyPricingInfoApiDataType;
}

export interface holiday {
  display_order: string;
  end_at: string;
  id: string;
  price: string;
  start_at: string;
}

export interface seasonal {
  display_order: string;
  end_at: string;
  id: string;
  price: string;
  start_at: string;
  weekend_price: string;
}

export interface PropertyPricingInfoType {
  holiday?: holiday[];
  seasonal?: seasonal[];
  weekdays_price: string;
  weekend_price: string;
}

export interface propertyPricingInfoApiResponseType {
  data: PropertyPricingInfoType;
}
