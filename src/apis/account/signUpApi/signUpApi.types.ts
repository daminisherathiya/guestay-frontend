export interface SignUpApiDataType {
  confirmPassword: string;
  countryCode: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  profilePicture: string;
  userName: string;
}

export interface SignUpApiType {
  data: SignUpApiDataType;
}

export interface SignUpAPIResponseType {
  recordId: number;
}
