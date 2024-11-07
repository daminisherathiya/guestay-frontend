export interface bedTypesApiDataType {
  userId: string;
}

export interface bedTypesApiType {
  data: bedTypesApiDataType;
}

export interface bedTypeType {
  icon: string;
  id: string;
  num_of_beds: string;
  num_of_people: string;
  title: string;
}

export interface bedTypesApiResponseType {
  data: bedTypeType[];
}
