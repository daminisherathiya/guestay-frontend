export interface propertyPricingInfoApiDataType {
  propertyId: string;
  userId: string;
}

export interface propertyPricingInfoApiType {
  data: propertyPricingInfoApiDataType;
}

export interface Holiday {
  display_order: string;
  end_at: string;
  id: string;
  price: string;
  start_at: string;
}

export interface Seasonal {
  display_order: string;
  end_at: string;
  id: string;
  price: string;
  start_at: string;
  weekend_price: string;
}

export interface PropertyPricingInfoType {
  commission_rate: string;
  holiday?: Holiday[];
  property_weekend_days: string;
  seasonal?: Seasonal[];
  weekdays_price: string;
  weekend_price: string;
}

export interface propertyPricingInfoApiResponseType {
  data: PropertyPricingInfoType;
}
