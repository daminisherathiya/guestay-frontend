import { UserDataType } from "@/types/User.types";

export interface LogInApiDataType {
  email: string;
  password: string;
}

export interface LogInApiType {
  data: LogInApiDataType;
}

export interface LogInAPIResponseType {
  data: {
    auth_token: string;
    userData: UserDataType;
  };
}
