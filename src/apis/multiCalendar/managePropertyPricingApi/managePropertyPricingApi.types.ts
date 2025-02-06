export interface ManagePropertyPricingDataType {
  holidayEndAt?: string[];
  holidayId?: string[];
  holidayOrder?: string[];
  holidayPrice?: string[];
  holidayStartAt?: string[];
  propertyId: string;
  seasonEndAt?: string[];
  seasonId?: string[];
  seasonPrice?: string[];
  seasonStartAt?: string[];
  seasonWeekendPrice?: string[];
  seasonalOrder?: string[];
  userId: string;
  weekdaysPrice: string;
  weekendPrice: string;
}

export interface managePropertyPricingApiType {
  data: ManagePropertyPricingDataType;
}

export interface managePropertyPricingApiResponseType {
  data: {};
}
