export interface changePasswordApiDataType {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
  userId: string;
}

export interface changePasswordApiType {
  data: changePasswordApiDataType;
}
