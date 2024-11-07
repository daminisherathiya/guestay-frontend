export interface globalPricesApiDataType {
  userId: string;
}

export interface globalPricesApiType {
  data: globalPricesApiDataType;
}

export interface GlobalPriceType {
  name: string;
  value: string;
}

export interface globalPricesApiResponseType {
  data: GlobalPriceType[];
}
